---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Python Bubble Sort
categories:
  - python
  - list
  - bubble sort
tags:
  - python
---

### Bubble Sort a List of Numbers

Check adjacent elements and swap them if right element < left element

<pre>
my_list = [8, 10, 6, 2, 4]  # list to sort
swapped = True  # flag variable to mark when to stop looping

while swapped:
    swapped = False  # no swaps so far
    for i in range(len(my_list) - 1):
        if my_list[i] > my_list[i + 1]:
            swapped = True  # a swap occurred!
            my_list[i], my_list[i + 1] = my_list[i + 1], my_list[i]

print(my_list)
</pre>
