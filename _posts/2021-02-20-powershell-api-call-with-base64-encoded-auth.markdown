---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Powershell API Call with base64 encoded auth
date: 2021-02-20 00:05:53.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- powershell
- script
- api automation
- base64
tags: ['powershell', 'script', 'api automation', 'base64']
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '55022020408'
  timeline_notification: '1613779555'
author:
  'Scratches'
permalink: "/2021/02/20/powershell-api-call-with-base64-encoded-auth/"
---
<pre># Ignore Certificate Issues
>add-type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

function getSession($url) {
    $creds = 'YWRtaW46YWRtaW4xMjM='
    
    $requestString = 'session'

    $fullUrl = $url + $requestString
    $headers= @{
        'NSM-SDK-API' = $creds
        'Accept' = 'application/vnd.nsm.v1.0+json'
        'Content-Type' = 'application/json'
        }

    # Get Session token Output to file version
    #Invoke-RestMethod -Method 'Get' -Uri $fullUrl -Headers $headers -OutFile output.csv

    # Get Session Token
    $sessionToken = Invoke-RestMethod -Method 'Get' -Uri $fullUrl -Headers $headers
    Write-Host Your session token is: $sessionToken.session
    
    return $sessionToken

}

function apiCall($apiToken, $method, $url, $requestUri) { 
    
    $callUrl = $url + $requestUri
    $headers= @{
        'NSM-SDK-API' = $apiToken
        'Accept' = 'application/vnd.nsm.v1.0+json'
        'Content-Type' = 'application/json'
        }
   
    if ($method -eq 'GET') {
        $apiCallOutput = Invoke-RestMethod -Method 'GET' -Uri $callUrl -Headers $headers -Verbose
    } elseif ($method -eq 'POST') {
         $apiCallOutput = Invoke-RestMethod -Method 'POST' -Uri $callUrl -Headers $headers -Verbose
    } else {
        Write-Host "Method ---&gt;&gt; " +($method) "is not yet defined in the api script"
        $apiCallOutput = 'none'
    }
    return $apiCallOutput
    }



$serverIP = '10.10.17.148'
$url = 'https://'+($serverIP)+'/sdkapi/'

# Get Session Token
$sessionToken = getSession $url
$token = $sessionToken.session+':'+$sessionToken.userId
# Convert token to base64
$Bytes = [System.Text.Encoding]::UTF8.GetBytes($token)
#$enc = [System.Text.Encoding]::ASCII
#$enc.GetString($Bytes)
$apiToken =[System.Convert]::ToBase64String($Bytes)
$apiToken.TrimEnd()

# Get Heartbeat to test 
$requestUri = 'heartbeat'
$method = 'GET'
$heartbeat = apiCall $apiToken $method $url $requestUri

# Global Auto Ack
$requestUri = 'globalautoack'
$method = 'GET'
$globalautoackInfo = apiCall $apiToken $method $url $requestUri

# Domain Info
$requestUri = 'domain'
$method = 'GET'
$domainInfo = apiCall $apiToken $method $url $requestUri


# If only one domain
$domainInfo.DomainDescriptor.id
</pre>

