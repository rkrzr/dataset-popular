// Copyright 2006 Google Inc.
// All Rights Reserved.

/**
 * @fileoverview
 * Implements RFC 3986 for parsing/formatting URIs.
 *
 * @author msamuel@google.com
 */

/**
 * creates a uri from the string form.  The parser is relaxed, so special
 * characters that aren't escaped but don't cause ambiguities will not cause
 * parse failures.
 *
 * @return {URI|Null}
 */
function uri_parse(uriStr) {
  var m = uriStr.match(URI_RE_);
  if (!m) { return null; }
  return new URI(
      uri_nullIfAbsent_(m[1]),
      uri_nullIfAbsent_(m[2]),
      uri_nullIfAbsent_(m[3]),
      uri_nullIfAbsent_(m[4]),
      uri_nullIfAbsent_(m[5]),
      uri_nullIfAbsent_(m[6]),
      uri_nullIfAbsent_(m[7]));
}


/**
 * creates a uri from the given parts.
 *
 * @param scheme {String} an unencoded scheme such as "http" or null
 * @param credentials {String} unencoded user credentials or null
 * @param domain {String} an unencoded domain name or null
 * @param port {Number} a port number in [1, 32768].
 *    -1 indicates no port, as does null.
 * @param path {String} an unencoded path
 * @param cgiParamList {Array.<String>} a list of unencoded cgi parameters where
 *   even values are keys and odds the corresponding values.
 * @param fragment {String} an unencoded fragment without the "#" or null.
 * @return {URI}
 */
function uri_create(
    scheme, credentials, domain, port, path, cgiParamList, fragment) {
  var uri = new URI(
      uri_encodeIfExists2_(scheme, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),
      uri_encodeIfExists2_(
          credentials, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),
      uri_encodeIfExists_(domain),
      port > 0 ? port.toString() : null,
      uri_encodeIfExists2_(path, URI_DISALLOWED_IN_PATH_),
      null,
      uri_encodeIfExists_(fragment));
  if (cgiParamList) {
    uri.SetAllCgiParameters(cgiParamList);
  }
  return uri;
}
function uri_encodeIfExists_(unescapedPart) {
  if ('string' == typeof unescapedPart) {
    return encodeURIComponent(unescapedPart);
  }
  return null;
};
/**
 * if unescapedPart is non null, then escapes any characters in it that aren't
 * valid characters in a url and also escapes any special characters that
 * appear in extra.
 *
 * @param unescapedPart {String}
 * @param extra {RegExp} a character set of characters in [\01-\177].
 * @return {String|Null} null iff unescapedPart == null.
 */
function uri_encodeIfExists2_(unescapedPart, extra) {
  if ('string' == typeof unescapedPart) {
    return encodeURI(unescapedPart).replace(extra, uri_encodeOne_);
  }
  return null;
};
/** converts a character in [\01-\177] to its url encoded equivalent. */
function uri_encodeOne_(ch) {
  var n = ch.charCodeAt(0);
  return '%' + '0123456789ABCDEF'.charAt((n >> 4) & 0xf) +
    '0123456789ABCDEF'.charAt(n & 0xf);
}

/**
 * resolves a relative url string to a base uri.
 * @return {URI}
 */
function uri_resolve(baseUri, relativeUri) {
  // there are several kinds of relative urls:
  // 1. foo - replaces the last part of the path, the whole query and fragment
  // 2. /foo - replaces the the path, the query and fragment
  // 3. //foo - replaces everything from the domain on.  foo is a domain name
  // 4. ?foo - replace the query and fragment
  // 5. #foo - replace the fragment only

  var absoluteUri = baseUri.Clone();
  // we satisfy these conditions by looking for the first part of relativeUri
  // that is not blank and applying defaults to the rest

  var overridden = relativeUri.HasScheme();

  if (overridden) {
    absoluteUri.SetRawScheme(relativeUri.GetRawScheme());
  } else {
    overridden = relativeUri.HasCredentials();
  }

  if (overridden) {
    absoluteUri.SetRawCredentials(relativeUri.GetRawCredentials());
  } else {
    overridden = relativeUri.HasDomain();
  }

  if (overridden) {
    absoluteUri.SetRawDomain(relativeUri.GetRawDomain());
  } else {
    overridden = relativeUri.HasPort();
  }

  var rawPath = relativeUri.GetRawPath();
  if (overridden) {
    absoluteUri.SetPort(relativeUri.GetPort());
  } else {
    overridden = relativeUri.HasPath();
    if (overridden) {
      // resolve path properly
      if (!new RegExp("^/").test(rawPath)) {
        // path is relative
        rawPath = absoluteUri.GetRawPath().replace(
            new RegExp("/?[^/]*$"),
            '/' + rawPath);
      }
    }
  }

  if (overridden) {
    absoluteUri.SetRawPath(rawPath);
  } else {
    overridden = relativeUri.HasQuery();
  }

  if (overridden) {
    absoluteUri.SetRawQuery(relativeUri.GetRawQuery());
  } else {
    overridden = relativeUri.HasFragment();
  }

  if (overridden) {
    absoluteUri.SetRawFragment(relativeUri.GetRawFragment());
  }

  return absoluteUri;
}

/**
 * a mutable URI.
 *
 * This class contains setters and getters for the parts of the URI.
 * The <tt>GetXYZ</tt>/<tt>SetXYZ</tt> methods return the decoded part -- so
 * <code>uri_parse('/foo%20bar').GetPath()</code> will return the decoded path,
 * <tt>/foo bar</tt>.
 *
 * <p>The raw versions of fields are available too.
 * <code>uri_parse('/foo%20bar').GetRawPath()</code> will return the raw path,
 * <tt>/foo%20bar</tt>.  Use the raw setters with care, since
 * <code>URI::toString</code> is not guaranteed to return a valid url if a
 * raw setter was used.
 *
 * <p>All setters return <tt>this</tt> and so may be chained, a la
 * <code>uri_parse('/foo').SetFragment('part').toString()</code>.
 *
 * <p>You should not use this constructor directly -- please prefer the factory
 * functions {@link #uri_parse}, {@link #uri_create}, {@link #uri_resolve}
 * instead.</p>
 *
 * <p>The parameters are all raw (assumed to be properly escaped) parts, and
 * any (but not all) may be null.  Undefined is not allowed.</p>
 *
 * @constructor
 */
function URI(
    rawScheme,
    rawCredentials, rawDomain, port,
    rawPath, rawQuery, rawFragment
    ) {
  this.scheme_ = rawScheme;
  this.credentials_ = rawCredentials;
  this.domain_ = rawDomain;
  this.port_ = port;
  this.path_ = rawPath;
  this.query_ = rawQuery;
  this.fragment_ = rawFragment;
  /**
   * @type {Array|null}
   */
  this.paramCache_ = null;
}

/** returns the string form of the url. */
URI.prototype.toString = function () {
  var out = [];
  if (null !== this.scheme_) { out.push(this.scheme_, ':'); }
  if (null !== this.domain_) {
    out.push('//');
    if (null !== this.credentials_) { out.push(this.credentials_, '@'); }
    out.push(this.domain_);
    if (null !== this.port_) { out.push(':', this.port_.toString()); }
  }
  if (null !== this.path_) { out.push(this.path_); }
  if (null !== this.query_) { out.push('?', this.query_); }
  if (null !== this.fragment_) { out.push('#', this.fragment_); }
  return out.join('');
};

URI.prototype.Clone = function () {
  return new URI(this.scheme_, this.credentials_, this.domain_, this.port_,
                 this.path_, this.query_, this.fragment_);
};

URI.prototype.GetScheme = function () {
  return this.scheme_ && uri_decodeThatWorks_(this.scheme_);
};
URI.prototype.GetRawScheme = function () {
  return this.scheme_;
};
URI.prototype.SetScheme = function (newScheme) {
  this.scheme_ = uri_encodeIfExists2_(
      newScheme, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_);
  return this;
};
URI.prototype.SetRawScheme = function (newScheme) {
  this.scheme_ = newScheme ? newScheme : null;
  return this;
};
URI.prototype.HasScheme = function () {
  return null !== this.scheme_;
};


URI.prototype.GetCredentials = function () {
  return this.credentials_ && uri_decodeThatWorks_(this.credentials_);
};
URI.prototype.GetRawCredentials = function () {
  return this.credentials_;
};
URI.prototype.SetCredentials = function (newCredentials) {
  this.credentials_ = uri_encodeIfExists2_(
      newCredentials, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_);

  return this;
};
URI.prototype.SetRawCredentials = function (newCredentials) {
  this.credentials_ = newCredentials ? newCredentials : null;
  return this;
};
URI.prototype.HasCredentials = function () {
  return null !== this.credentials_;
};


URI.prototype.GetDomain = function () {
  return this.domain_ && uri_decodeThatWorks_(this.domain_);
};
URI.prototype.GetRawDomain = function () {
  return this.domain_;
};
URI.prototype.SetDomain = function (newDomain) {
  this.domain_ = newDomain ? encodeURIComponent(newDomain) : null;
  return this;
};
URI.prototype.SetRawDomain = function (newDomain) {
  this.domain_ = newDomain ? newDomain : null;
  return this;
};
URI.prototype.HasDomain = function () {
  return null !== this.domain_;
};


URI.prototype.GetPort = function () {
  return this.port_ && uri_decodeThatWorks_(this.port_);
};
URI.prototype.SetPort = function (newPort) {
  if (newPort) {
    if ('number' !== typeof newPort) {
      newPort = parseInt(newPort, 10);
      if (newPort < 0 || isNaN(newPort)) {
        throw new Error('Bad port number ' + newPort);
      }
    }
    this.port_ = newPort.toString();
  } else {
    this.port_ = null;
  }
  return this;
};
URI.prototype.HasPort = function () {
  return null !== this.port_;
};


URI.prototype.GetPath = function () {
  return this.path_ && uri_decodeThatWorks_(this.path_);
};
URI.prototype.GetRawPath = function () {
  return this.path_;
};
URI.prototype.SetPath = function (newPath) {
  this.path_ = uri_encodeIfExists2_(newPath, URI_DISALLOWED_IN_PATH_);
  return this;
};
URI.prototype.SetRawPath = function (newPath) {
  this.path_ = newPath ? newPath : null;
  return this;
};
URI.prototype.HasPath = function () {
  return null !== this.path_;
};


URI.prototype.GetQuery = function () {
  return this.query_ && uri_decodeThatWorks_(this.query_);
};
URI.prototype.GetRawQuery = function () {
  return this.query_;
};
URI.prototype.SetQuery = function (newQuery) {
  this.paramCache_ = null;
  this.query_ = uri_encodeIfExists_(newQuery);
  return this;
};
URI.prototype.SetRawQuery = function (newQuery) {
  this.paramCache_ = null;
  this.query_ = newQuery ? newQuery : null;
  return this;
};
URI.prototype.HasQuery = function () {
  return null !== this.query_;
};

/**
 * sets the query given a list of strings of the form
 * [ key0, value0, key1, value1, ... ].
 *
 * <p><code>uri.SetAllCgiParameters(['a', 'b', 'c', 'd']).GetQuery()</code>
 * will yield <code>'a=b&c=d'</code>.
 */
URI.prototype.SetAllCgiParameters = function (unescapedCgiParameters) {
  this.paramCache_ = null;
  var queryBuf = [];
  var separator = '';
  for (var i = 0; i < unescapedCgiParameters.length;) {
    var k = unescapedCgiParameters[i++];
    var v = unescapedCgiParameters[i++];
    queryBuf.push(separator, encodeURIComponent(k.toString()));
    separator = '&';
    if (v) {
      queryBuf.push('=', encodeURIComponent(v.toString()))
    }
  }
  this.query_ = queryBuf.join('');
  return this;
};
URI.prototype.CheckParameterCache_ = function () {
  if (!this.paramCache_) {
    if (!this.query_) {
      this.paramCache_ = [];
    } else {
      var cgiParams = this.query_.split(/[&\?]/);
      var out = [];
      for (var i = 0; i < cgiParams.length; ++i) {
        var m = cgiParams[i].match(/^([^=]*)(?:=(.*))?$/);
        out.push(uri_decodeThatWorks_(m[1]), uri_decodeThatWorks_(m[2] || ''));
      }
      this.paramCache_ = out;
    }
  }
};
/**
 * sets the values of the named cgi parameters.
 *
 * <p>So, <code>uri_parse('foo?a=b&c=d&e=f').SetCgiParameterValues('c', ['new'])
 * </code> yields <tt>foo?a=b&c=new&e=f</tt>.</p>
 *
 * @param key {String}
 * @param values {Array.<String>} the new values.  If values is a single string
 *   then it will be treated as the sole value.
 */
URI.prototype.SetCgiParameterValues = function (key, values) {
  // be nice and avoid subtle bugs where [] operator on string performs charAt
  // on some browsers and crashes on IE
  if (typeof values === 'string') { values = [ values ]; }

  this.CheckParameterCache_();
  var newValueIndex = 0;
  var pc = this.paramCache_;
  var params = [];
  for (var i = 0, k = 0; i < pc.length; i += 2) {
    if (key === pc[i]) {
      if (newValueIndex < values.length) {
        params.push(key, values[newValueIndex++]);
      }
    } else {
      params.push(pc[i], pc[i + 1]);
    }
  }
  while (newValueIndex < values.length) {
    params.push(key, values[newValueIndex++]);
  }
  this.SetAllCgiParameters(params);
  return this;
};
/**
 * returns the parameters specified in the query part of the uri as a list of
 * keys and values like [ key0, value0, key1, value1, ... ].
 *
 * @return {Array.<String>}
 */
URI.prototype.GetAllCgiParameters = function () {
  this.CheckParameterCache_();
  return this.paramCache_.slice(0, this.paramCache_.length);
};
/**
 * returns the value<b>s</b> for a given cgi parameter as a list of decoded
 * query parameter values.
 * @return {Array.<String>}
 */
URI.prototype.GetCgiParameterValues = function (paramNameUnescaped) {
  this.CheckParameterCache_();
  var values = [];
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    if (paramNameUnescaped === this.paramCache_[i]) {
      values.push(this.paramCache_[i + 1]);
    }
  }
  return values;
};
/**
 * returns a map of cgi parameter names to (non-empty) lists of values.
 * @return {Object.<String,Array.<String>>}
 */
URI.prototype.GetCgiParameterMap = function (paramNameUnescaped) {
  this.CheckParameterCache_();
  var paramMap = {};
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    var key = this.paramCache_[i++],
      value = this.paramCache_[i++];
    if (!(key in paramMap)) {
      paramMap[key] = [value];
    } else {
      paramMap[key].push(value);
    }
  }
  return paramMap;
};
/**
 * returns the first value for a given cgi parameter or null if the given
 * parameter name does not appear in the query string.
 * If the given parameter name does appear, but has no '<tt>=</tt>' following
 * it, then the empty string will be returned.
 * @return {String|Null}
 */
URI.prototype.GetCgiParameterValue = function (paramNameUnescaped) {
  this.CheckParameterCache_();
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    if (paramNameUnescaped === this.paramCache_[i]) {
      return this.paramCache_[i + 1];
    }
  }
  return null;
};

URI.prototype.GetFragment = function () {
  return this.fragment_ && uri_decodeThatWorks_(this.fragment_);
};
URI.prototype.GetRawFragment = function () {
  return this.fragment_;
};
URI.prototype.SetFragment = function (newFragment) {
  this.fragment_ = newFragment ? encodeURIComponent(newFragment) : null;
  return this;
};
URI.prototype.SetRawFragment = function (newFragment) {
  this.fragment_ = newFragment ? newFragment : null;
  return this;
};
URI.prototype.HasFragment = function () {
  return null !== this.fragment_;
};

/** work around a bug in uri_decodeURIComponent_ where it doesn't handle +'s. */
function uri_decodeThatWorks_(s) {
  return decodeURIComponent(s).replace(/\+/g, ' ');
}

function uri_nullIfAbsent_(matchPart) {
  return ('string' == typeof matchPart) && (matchPart.length > 0)
         ? matchPart
         : null;
}




/**
 * a regular expression for breaking a URI into its component parts.
 *
 * <p>http://www.gbiv.com/protocols/uri/rfc/rfc3986.html#RFC2234 says
 * As the "first-match-wins" algorithm is identical to the "greedy"
 * disambiguation method used by POSIX regular expressions, it is natural and
 * commonplace to use a regular expression for parsing the potential five
 * components of a URI reference.
 *
 * <p>The following line is the regular expression for breaking-down a
 * well-formed URI reference into its components.
 *
 * <pre>
 * ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
 *  12            3  4          5       6  7        8 9
 * </pre>
 *
 * <p>The numbers in the second line above are only to assist readability; they
 * indicate the reference points for each subexpression (i.e., each paired
 * parenthesis). We refer to the value matched for subexpression <n> as $<n>.
 * For example, matching the above expression to
 * <pre>
 *     http://www.ics.uci.edu/pub/ietf/uri/#Related
 * </pre>
 * results in the following subexpression matches:
 * <pre>
 *    $1 = http:
 *    $2 = http
 *    $3 = //www.ics.uci.edu
 *    $4 = www.ics.uci.edu
 *    $5 = /pub/ietf/uri/
 *    $6 = <undefined>
 *    $7 = <undefined>
 *    $8 = #Related
 *    $9 = Related
 * </pre>
 * where <undefined> indicates that the component is not present, as is the
 * case for the query component in the above example. Therefore, we can
 * determine the value of the five components as
 * <pre>
 *    scheme    = $2
 *    authority = $4
 *    path      = $5
 *    query     = $7
 *    fragment  = $9
 * </pre>
 *
 * <p>msamuel: I have modified the regular expression slightly to expose the
 * credentials, domain, and port separately from the authority.
 * The modified version yields
 * <pre>
 *    $1 = http              scheme
 *    $2 = <undefined>       credentials -\
 *    $3 = www.ics.uci.edu   domain       | authority
 *    $4 = <undefined>       port        -/
 *    $5 = /pub/ietf/uri/    path
 *    $6 = <undefined>       query without ?
 *    $7 = Related           fragment without #
 * </pre>
 */
var URI_RE_ = new RegExp(
      "^" +
      "(?:" +
        "([^:/?#]+)" +         // scheme
      ":)?" +
      "(?://" +
        "(?:([^/?#]*)@)?" +    // credentials
        "([^/?#:@]*)" +        // domain
        "(?::([0-9]+))?" +     // port
      ")?" +
      "([^?#]+)?" +            // path
      "(?:\\?([^#]*))?" +      // query
      "(?:#(.*))?" +           // fragment
      "$"
      );

var URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_ = /[#\/\?@]/g;
var URI_DISALLOWED_IN_PATH_ = /[\#\?]/g;
