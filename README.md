# dataset-popular


A dataset of popular pages (taken from [dir.yahoo.com](http://dir.yahoo.com)) with manually marked up semantic blocks.


## Overview

This dataset was developed as part of my Master's thesis
("A Quantitative Comparison of Semantic Web Page Segmentation Algorithms"), which can be found
[here](http://dspace.library.uu.nl/handle/1874/282656).

It contains a set of popular webpages taken from [dir.yahoo.com](http://dir.yahoo.com) that were
downloaded using `wget`. They include all static resources such as images, CSS files and Javascript
files as well, so that they can be rendered offline as they are seen online.
The links were rewritten to point to the local resources.
Furthermore is each page available in three versions: One with just the basic HTML as can be obtained
by a single GET request to a URL, and second as a serialized version of the DOM *after* all external
resources were loaded.
Finally there is a version of the DOM-pages which have manually marked up semantic blocks, which was
done by a number of volunteers.

## How to use this dataset

The file `mapping.txt` contains a mapping from the original URL of a downloaded page to its local
file path. E.g.:

    "http://www.un.org/en/" : "/opt/dataset-popular/www.un.org/www.un.org/en/index.html",
    
The filepath prefix "/opt/dataset-popular" is constant, while the relative part
"/www.un.org/www.un.org/en/index.html" gives the location of the `index.html` file.
Next to this file there are always four files:

    index.html.orig
    index.html
    index.dom.html
    index.blocks.html
    

index.html.orig is the unchanged original file (obtained by a single GET request).

index.html is the original file where only the links have been made absolute and rewritten to match the local file structure (the repo contains all static resources as well).

index.dom.html is the HTML *after* the DOM was rendered (with rewritten links).

index.blocks.html is like index.dom.html but it additionally contains the manually marked up block tags, which are HTML attributes called `data-block=1` or `data-block=2` depending on whether they are top-level blocks or sublevel-blocks. Each block additionally also contains a type, which is indicated by an attribute like the following: `data-block-type="Header"`.

## License

This dataset is in the Public Domain, but attribution is encouraged.
