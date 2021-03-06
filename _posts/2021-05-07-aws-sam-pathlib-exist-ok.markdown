---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
---
Using python3.8 with AWS SAM to create a lambda from a script 
that runs without error before applying changes for SAM.
Using pathlib to check if a path exists before creating a directory like this:

<pre>Path(os.path.join(sys.path[0], 
     "../../ToolDirectory/{}".format(TOOL_DIR_NAME))).mkdir(parents=True, exist_ok=True)</pre>

Returns this error: 
<pre>TypeError: mkdir() got an unexpected keyword argument 'exist_ok'</pre>

**exist_ok** is a valid parameter for pathlib with python3.8

After an hour of research and fiddling, the python2.7 solution to import **pathlib2** instead of just pathlib makes exist_ok work as expected with AWS. I think this may be because my instance was Amazon Linux2.

Whew!
