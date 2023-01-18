---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS SystemsManager CLI Examples
categories:
- python
- list
- 
tags:
- aws
---
### Swap elements in a list of any size
 * assign length variable with the current list's length for convenience
 * for loop runs through body `length // 2` times, to leave middle element of odd lists untouched 
 * swap the `i`th element with the element equal to `(length - i) - 1`
 * i.e. when i is element `0` the swap is with element `4` --> `(length - 0) - 1`
<pre>
my_list = [10, 1, 8, 3, 5]
length = len(my_list)

for i in range(length // 2)
   my_list[i], my_list[length - i - 1] = my_list[length - i - 1], my_list[i]
   
print(my_list)
</pre>
