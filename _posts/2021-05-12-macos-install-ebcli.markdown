---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
---

1. install Xcode
2. install Xcode commandline tools
3. git clone https://github.com/aws/aws-elastic-beanstalk-cli-setup.git
4. ./aws-elastic-beanstalk-cli-setup/scripts/bundled_installer
  *** <strong>fails</strong> .../Modules/posixmodule.c:8409:15: error: 
      implicit declaration of function 'sendfile' is 
      invalid in C99 [-Werror,-Wimplicit-function-declaration]
      ret = sendfile(in, out, offset, &sbytes, &sf, flags);
   
5. brew install zlib openssl readline
   CFLAGS="-I$(brew --prefix openssl)/include -I$(brew --prefix readline)/include -I$(xcrun --show-sdk-path)/usr/include" LDFLAGS="-L$(brew --prefix openssl)/lib -L$(brew --prefix readline)/lib -L$(brew --prefix zlib)/lib"
6. python3 ./aws-elastic-beanstalk-cli-setup/scripts/ebcli_installer.py
   * fails virtualenv not installed
7. python3 -m pip install virtualenv
   * fails openssl not available, so pip can't download virtualenv
8. brew reinstall openssl
   * fails 'Error: /usr/local/opt/openssl@1.1 is not a valid keg'
9. brew uninstall openssl
11. rm -rf /usr/local/opt/openssl@1.1
12. brew install openssl
13. python3 ./aws-elastic-beanstalk-cli-setup/scripts/ebcli_installer.py
*** <strong>success!</strong> (ebcli_installer.py doesn't install python)

