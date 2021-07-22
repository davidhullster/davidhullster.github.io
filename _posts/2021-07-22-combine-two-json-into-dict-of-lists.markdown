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
#### Take json response for 'apps' and combine it with json response for 'branches'
#### Makes dictionary of app names, each with a list of app branches in a list
<pre>
def create_dict_appid_to_branches():
    SVN_USERNAME, SVN_API_KEY, JIRA_USERNAME, JIRA_API_KEY = get_secrets()
    headers={'Mendix-ApiKey': f'{SVN_API_KEY}', 'Mendix-Username': f'{SVN_USERNAME}'}
    response = requests.get('https://deploy.mendix.com/api/1/apps', headers=headers)
    app_response = response.json()
    branch_dict = {}
    for app in app_response:
        print(f"AppId is: {app['AppId']}")
        app_id = app['AppId']
        branch_dict[app_id] = []
        response = requests.get(f'https://deploy.mendix.com/api/1/apps/{app_id}/branches', headers=headers)
        branches_response = response.json()
        for branch in branches_response:
            branch_dict[app['AppId']].append(branch['Name'])
            print(branch['Name'])
    with open('branch_file.json', 'w') as f:
        f.write(json.dumps(branch_dict))
</pre>
<p>Example:</p>
<pre>
    "app1": [
        "trunk",
        "branch1",
        "branch2",
        "branch3"
    ],
    "app2": [
        "trunk",
        "feature/farkle",
        "feature/snap",
        "feature/jester",
        "feature/waggle"
    ]
</pre>
