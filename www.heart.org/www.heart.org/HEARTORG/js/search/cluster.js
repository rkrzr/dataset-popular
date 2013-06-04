// Copyright 2006 Google Inc.,  All Rights Reserved
// dspencer@google.com


/**
 * @fileoverview
 *
 * This file is for the rendering of Clustered Search results
 * on the GSA.
 *
 *
 * The flow is:
 *
 * - User initiates search query and wants clustered results
 *
 * - Response page has:
 *      - <script> tags pulling in uri.js, common.js, xmlhttp.js, cluster.js
 *      - <body onload='cs_loadClusters(s, cs_drawClusters)'>
 *      - Elements with ids like cluster_label0..cluster_label9 which is
 *        where the first "n" cluster labels will be placed
 *
 * - The loadClusters() call initiates an AJAX request to the Enterprise
 *   Front End (EFE), who delegates to the Clustering Server (CS), who calls
 *   GWS and so on, and then the results come back as JSON
 *
 * - Then the JSON is rendered in drawClusters().
 *
 * The JSON that comes back from the GSA has this general structure:
 *
 * { "clusters": [
 *     { "algorithm": "Concepts",
 *       "clusters": [
 *         { "label": "label1",
 *           "docs": [1, 2, 3]
 *         },
 *         { "label": "label2",
 *           "docs": [2, 4, 6]
 *         } ...
 *       ]
 *     }
 *   ],
 *
 *   "documents": [
 *     { "url": "url0",
 *       "title": "title0",
 *       "snippet": "snippet0"
 *     },
 *     ..
 *     { "url": "url99",
 *       "title": "title99",
 *       "snippet": "snippet99"
 *     },
 *   ]
 * }
 *
 * So at the outer level there are 2 fields in the dict, 'clusters' and
 * 'documents'. The 'clusters' field has one entry for every clustering
 * algorithm.
 *
 * Every clustering algorithm has a dict with 'algorithm' and 'clusters'.
 * The 'algorithm' field is the name, and the 'clusters' field is a list
 * of cluster labels and contents. Cluster contents are indexes into the
 * 'documents' field.
 *
 * The 'documents' field holds search results, with one entry per result.
 *
 *
 * Tested under:
 *     Firefox 1.5.0.7 (Linux)
 *     Firefox 1.5.0.7 (WinXP)
 *     Firefox 1.5.0.4 (Mac OS X 10.4.7)
 *
 *     IE 6.0... (WinXP SP2)
 *
 *     Safari (Mac OS X 10.4.7)
 *
 * @author dspencer@google.com
 *
 * @requires common.js
 * @requires xmlthtp.js
 * @requires uri.js
 */


/**
 * Name of conceptual clustering servlet in
 * servlet array in JSON dictionary.
 */
var CS_CONCEPTS_NAME = 'Concepts';

/**
 * Name of conceptual clustering dictionary in
 * JSON blob.
 */
var CS_CLUSTERS_FIELD_NAME = 'clusters';
var CS_DOCUMENTS_FIELD_NAME = 'documents';

/**
 * Prefix of cluster label element id.
 * This is followed by a number, probably 0..9.
 */
var CS_CLUSTER_LABEL_PREFIX = 'cluster_label';

/**
 * Name of outer container which holds the
 * cluster labels.
 */
var CS_CLUSTER_LABEL_CONTAINER = 'cluster_label_container';

/**
 * Name of an element used for showing messages ("Loading..."
 * and error messages). Hidden when the clusters are present
 */
var CS_MESSAGE_ELEMENT = 'cluster_message';

/**
 * Message displayed in the element named by CS_MESSAGE_ELEMENT until
 * clustering results are generated.
 *
 * TODO(dspencer): I18N
 *
 * @see #CS_MESSAGE_ELEMENT
 */
var CS_LOADING = "Loading...";

/**
 * Message displayed in the element named by CS_MESSAGE_ELEMENT when
 * clustering somehow fails.
 *
 * TODO(dspencer): I18N
 * TODO(dspencer): Add more feedback as to why clustering failed.
 *
 * @see #CS_MESSAGE_ELEMENT
 */
var CS_NO_RESULTS = "No narrowing is possible for this search query.";

/**
 * The max labels to display.
 */
var CS_MAX_LABELS_TO_DISPLAY = 10;

/**
 * Format an HREF.
 *
 * @param {String} url The URL to format.
 * @param {String} text The anchor text.
 *
 * @return A formatted 'a' tag.
 */
function cs_createAnchorCode(url, text) {
  var encodedurl = url.replace("'" , uri_encodeOne_("'"));
  if (self.cl_link_clicked) { // ASR is enabled and loaded.
    return "<a href='" + encodedurl +
           "' ctype='cluster' onmousedown='cl_link_clicked(event)'>" +
           text + "</a>";
  } else {
    return "<a href='" + encodedurl + "'>" + text + "</a>";
  }
}

/**
 * Show up to 'max_labels' cluster labels. The ones that
 * are not shown are made invisible.
 *
 * @param {Number} maxLabels The maximum number of labels to display.
 * @param {String} srchArgs The arguments the user is searching with.
 * @param {Array} clusters The conceptual clustering part of the JSON blob.
 * @param {Array} documents The documents coming back from the search engine.
 *
 * @private
 */
function cs_showLabels(maxLabels, srchArgs, clusters, documents) {
  var searchUri = "/search?" + srchArgs;
  // By definition we only handle cluster_label[0..9]
  for (var ci = 0; ci < Math.min(maxLabels, clusters.length); ci++) {
    var div = document.getElementById(CS_CLUSTER_LABEL_PREFIX + ci);
    if (div) {
      ShowElement(div, true);
      var curc = clusters[ci];
      var uri = uri_parse(searchUri);
      // replace the "q" argument with the current label
      uri = uri.SetCgiParameterValues("q", curc.label);
      uri = uri.toString();
      var href = cs_createAnchorCode(uri, curc.label);
      div.innerHTML = href;
    }
  }
  for (var ci = clusters.length; ci < maxLabels; ci++) {
    var div = document.getElementById(CS_CLUSTER_LABEL_PREFIX + ci);
    if (div) {
      ShowElement(div, false); 
    }
  }
}

/**
 * Find a servlet with a given name.
 *
 * @param {Object} blob The JSON blob.
 * @param {String} algorithm The name of the algorithm to lookup.
 *
 * @return The clusters of the indicated algorithms or null.
 *
 * @private
 */
function cs_findServlet(blob, algorithm) {
  var clusters = blob[CS_CLUSTERS_FIELD_NAME];
  for (var i = 0; i < clusters.length; i++) {
    if (clusters[i].algorithm == algorithm) {
      return clusters[i];
    }
  }
  return null;
}

/**
 * Draw the cluster labels. We turn off the image that shows
 * that the clustering is being calculated and then
 * draw up to CS_MAX_LABELS_TO_DISPLAY cluster labels in the elements named
 * cluster_label0...cluster_label9.
 *
 * @param {String} srchArgs The arguments to the search request.
 * @param {Object} blob The JSON blob returned by the Clustering Server.
 *
 */
function cs_drawClusters(srchArgs, blob) {
  if (document.getElementById(CS_MESSAGE_ELEMENT)) {
    ShowElement(document.getElementById(CS_MESSAGE_ELEMENT), false);
  }

  // Parse the JSON blob.
  var servlets = blob[CS_CLUSTERS_FIELD_NAME];
  var documents = blob[CS_DOCUMENTS_FIELD_NAME];

  var concepts = cs_findServlet(blob, CS_CONCEPTS_NAME);
  
  // Now fill in any optional page elements that are present.
  // If the first numbered label is present then
  // fill in all 10.
  if (document.getElementById(CS_CLUSTER_LABEL_PREFIX + '0')) {
    var container = document.getElementById(CS_CLUSTER_LABEL_CONTAINER);
    if (concepts) {
      cs_showLabels(CS_MAX_LABELS_TO_DISPLAY, srchArgs,
                    concepts.clusters, documents);

      if (container) {
        ShowElement(container, true);
      }
    } else {
      // Assume that if the conceptual clustering dict is not present
      // that clustering failed.
      if (document.getElementById(CS_MESSAGE_ELEMENT)) {
        document.getElementById(CS_MESSAGE_ELEMENT).innerHTML = CS_NO_RESULTS;
        ShowElement(document.getElementById(CS_MESSAGE_ELEMENT), true);
      }
    }
  }
  // Note: future versions of this function will check for other
  // elements and call other lower level rendering functions e.g.
  // ones for tabs and other UI treatments.
}

/**
 * Make a call to load in the JSON with the
 * output of the Clustering Server and
 * the call the rendering function with the output.
 *
 * @param {String} srchArgs The URI arguments the user is performing their normal
 *   search with. This will probably come from some variable expansion on
 *   the XSL of the Front End. A real example would be:
 *
 *               "entqr=0&access=p&output=xml_no_dtd&sort=date%3AD%3AL%3Ad1&
 *                ie=UTF-8&btnG=Google+Search&client=f7&q=china&ud=1&
 *                site=default_collection&oe=UTF-8&proxystylesheet=f7&
 *                ip=172.18.68.100"
 *
 * @param {Function} render: The rendering function which is called on
 *      completion with 2 arguments, the search URL (the arg above) and the JSON
 *      blob that comes back from the CS.
 *
 */
function cs_loadClusters(srchArgs, render) {
  var messageElement = document.getElementById(CS_MESSAGE_ELEMENT);
  if (messageElement) {
    messageElement.innerHTML = CS_LOADING;
    ShowElement(messageElement, true);
  }

  var xmlhttp = XH_XmlHttpCreate();
  var uri = "/cluster?coutput=json&" + srchArgs;
  var handler = function() {
    if (xmlhttp.readyState == XML_READY_STATE_COMPLETED) {
      render(srchArgs, eval('(' + xmlhttp.responseText + ')'));
    }
  };
  XH_XmlHttpPOST(xmlhttp, uri, "", handler);
}
