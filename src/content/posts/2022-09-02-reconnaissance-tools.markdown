### get info about domains/websites
<pre>
There are hundreds of tools relevant to security assessments, network reconnaissance, vulnerability scanning, and penetration testing. Security distributions specialize in bundling these tools for Linux—notably KALI (kali.org) plus ParrotOS (parrotlinux.org)—and Windows (fireeye.com/blog/threat-research/2019/03/commando-vm-windows-offensive-distribution.html).

theHarvester
theHarvester is a tool for gathering open-source intelligence (OSINT) for a particular domain or company name (github.com/laramies/theHarvester). It works by scanning multiple public data sources to gather emails, names, subdomains, IPs, URLs and other relevant data.

dnsenum
While you can use tools such as dig and whois to query name records and hosting details and to check that external DNS services are not leaking too much information, a tool such as dnsenum packages a number of tests into a single query (github.com/fwaeytens/dnsenum). As well as hosting information and name records, dnsenum can try to work out the IP address ranges that are in use.

scanless
Port scanning is difficult to conceal from detection systems, unless it is performed slowly and results are gathered over an extended period. Another option is to disguise the source of probes. To that end, scanless is a tool that uses third-party sites (github.com/vesche/scanless). This sort of tool is also useful in a defensive sense, by scanning for ports and services that are open but shouldn't be.

curl
curl is a command line client for performing data transfers over many types of protocol (curl.haxx.se). This tool can be used to submit HTTP GET, POST, and PUT requests as part of web application vulnerability testing. curl supports many other data transfer protocols, including FTP, IMAP, LDAP, POP3, SMB, and SMTP.

Nessus
The list of services and version information that a host is running can be cross-checked against lists of known software vulnerabilities. This type of scanning is usually performed using automated tools. Nessus, produced by Tenable Network Security (tenable.com/products/nessus/nessus-professional), is one of the best-known commercial vulnerability scanners. It is available in on-premises (Nessus Manager) and cloud (Tenable Cloud) versions, as well as a Nessus Professional version, designed for smaller networks. The product is free to use for home users but paid for on a subscription basis for enterprises. As a previously open-source program, Nessus also supplies the source code for many other scanners.
</pre>
### Use ss instead of netstat
<pre>
ss -l
The above command will only output a list of current listening sockets.

To make it a bit more specific, think of it this way: ss can be used to view TCP connections by using the -t option, UDP connections by using the -u option, or UNIX connections by using the -x option; so ss -t,  ss -u, or ss -x. Running any of those commands will list out plenty of information for you to comb through (Figure 2).


Figure 2: Running ss -u on Elementary OS offers a quick display of UDP connections.
By default, using either the -t, the -u, or the -x options alone will only list out those connections that are established (or connected). If we want to pick up connections that are listening, we have to add the -a option like:

ss -t -a 
The output of the above command will include all TCP sockets (Figure 3).
</pre>
### Filtering ss with TCP States
#### One very handy option available to the ss command is the ability to filter using TCP states (the the “life stages” of a connection). With states, you can more easily filter your ss command results. The ss tool can be used in conjunction with all standard TCP states:
```sh
established

syn-sent

syn-recv

fin-wait-1

fin-wait-2

time-wait

closed

close-wait

last-ack

listening

closing
```
#### Other available state identifiers ss recognizes are:
```
all (all of the above states)

connected (all the states with the exception of listen and closed)

synchronized (all of the connected states with the exception of syn-sent)

bucket (states which are maintained as minisockets, for example time-wait and

syn-recv)

big (Opposite to bucket state)
```
#### The syntax for working with states is simple.
```
For tcp ipv4:
ss -4 state FILTER
For tcp ipv6:

ss -6 state FILTER
```
<pre>
Say you want to view all listening IPv4 sockets on your machine. For this, the command would be:

ss -4 state listening
</pre>
<pre>
Show connected sockets from specific address
One handy task you can assign to ss is to have it report connections made by another IP address. Say you want to find out if/how a machine at IP address 192.168.1.139 has connected to your server. For this, you could issue the command:

ss dst 192.168.1.139
</pre>