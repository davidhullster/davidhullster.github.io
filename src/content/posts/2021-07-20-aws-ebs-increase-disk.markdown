---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CLI Filters and Queries
categories:
- aws
tags:
- aws
- ebs
- ec2
- disk space

---
#### allow bucket owner to read objects written by other accounts
<pre>
    How to know if your disk is EXT4, XFS, etc?
    Remember, in Linux, everything is a file:
    
        How do I tell what sort of data (what data format) is in a file?
        → Use the file utility.

        Here, you want to know the format of data in a device file, so you need to pass the -s flag to tell file not just to say that it's a device file but look at the content. Sometimes you'll need the -L flag as well, if the device file name is a symbolic link. You'll see output like this:

        # file -sL /dev/sd*
        /dev/sda1: Linux rev 1.0 ext4 filesystem data, UUID=63fa0104-4aab-4dc8-a50d-e2c1bf0fb188 (extents) (large files) (huge files)
        /dev/sdb1: Linux rev 1.0 ext2 filesystem data, UUID=b3c82023-78e1-4ad4-b6e0-62355b272166
        /dev/sdb2: Linux/i386 swap file (new style), version 1 (4K pages), size 4194303 pages, no label, UUID=3f64308c-19db-4da5-a9a0-db4d7defb80f

    run lsblk to see attached storage

    NVME Disks
     sudo growpart /dev/nvme0n1 1

        XFS Disks
        sudo xfs_growfs -d /

        EXT4 Disks
        sudo resize2fs /dev/nvme0n1p1

    EBS Legacy - Not NVME
    sudo growpart /dev/xvda 1

        XFS Disks
        sudo xfs_growfs -d /

        EXT4 Disks
        sudo resize2fs /dev/xvda1
</pre>
