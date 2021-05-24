---
layout: posts
tags:
- bash
- file rename
author:
    Scratches
---

<pre>
# Rename all *.html to *.markdown
for f in *.html; do 
    mv -- "$f" "${f%.html}.markdown"
done
</pre>
<br>
<pre>-- marks the end of the option list.</pre> 
* This avoids issues with filenames starting with hyphens.
<pre>${f%.html} is a parameter expansion</pre> 
* and is replaced by the value of f with .html removed from the end.