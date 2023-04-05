---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Git Rebase to Squash Commits
categories:
- git
- rebase
- squash
tags:
- git
---

you can squash multiple commits on a local branch into a single commit using the git rebase command with the -i or --interactive option.

<h3>Steps:</h3>
First, make sure that you're on the branch that you want to squash the commits on.

<pre>
git checkout <branch_name>
</pre>
Then, run the following command to start an interactive rebase session:
<pre>
git rebase -i HEAD~n
</pre>
Replace n with the number of commits you want to squash. For example, if you want to squash the last 3 commits, use git rebase -i HEAD~3.

An editor will open with a list of the commits that are being rebased. Each commit will be listed with the word "pick" in front of it. Change "pick" to "squash" or "s" for all the commits except the first one. Leave the first commit as "pick". For example, if you have four commits, your file should look like this:
<pre>
pick a1b2c3d First commit
squash e4f5g6h Second commit
squash i7j8k9l Third commit
squash m1n2o3p Fourth commit
</pre>
Save and close the file. Another editor will open with the commit message for the new, squashed commit. Edit the commit message as needed, save, and close the file.

Finally, force push the branch to update the remote with the squashed commit:

<pre>
git push -f
</pre>
Note that squashing commits changes the commit history, so use it carefully and avoid doing it on branches that are being shared with other people.