Redactor Style It for Craft
===========

Allows you to add classes to elements in rich text fields in Craft. It requires Craft 2.5+/Redactor II.

**This plugin was made to eliviate some of the pain that Redactor II caused when it was introduced in Craft 2.5. 
Based on Imperavi's (the creators of Redactor) current track record of breaking backwards compability, I don't advise
using the wysiwyg editor for anything more than what's absolutely necessary. So, introduce this
plugin into your project as a last resort!**


Usage
---
Download the code and put the redactorstyleit folder in your craft plugins folder. Go to Settings > Plugins 
and install it. Go back to Settings > Redactor Style It to configure the plugin.

In the settings you need to add a JSON Object which defines the options and CSS to style the options in the Redactor field. 
The JSON object may look something like this:

    [
        { 
            "btnName":"Blue text", 
            "className":"blue-text"
        },
        { 
            "btnName":"Indented Text", 
            "className":"indented-text"
        },
        { 
            "btnName":"Action button", 
            "className":"action-button",
            "allowedIn": "a"
        }
    ]

See available options below. 

In the CSS field you set up any CSS you need to customize the redactor fields in the 
control panel. Could be somthing like this:

    .redactor-dropdown .redactor-dropdown-blue-text,
    .redactor-editor .blue-text { color: #8acfdd; }
    
    .redactor-dropdown .redactor-dropdown-indented-text, 
    .redactor-editor .indented-text { text-indent: 3em; }

    .redactor-dropdown .redactor-dropdown-action-button,
    .redactor-editor .action-button { color: #fff; background: #f00; }
    .redactor-editor .action-button { display: inline-block; padding: 5px 10px; }
    
You can alternatively specify an external file for your CSS in the 'Styles CSS File' input field. 
This needs to be a public path above your web root, so `/css/redactorStyles.css` for example. You can also use `{siteUrl}css/redactorStyleIt.css` 
if you are using Craft's [Environment-Specific Variables](http://buildwithcraft.com/docs/multi-environment-configs#environment-specific-variables).

The last ting you need to do is enable the styles plugin in the Redactor configuration and hook in the configuration. 
Here's an example (could be myredactor.json in /craft/config/redactor):

    {
	    "buttons": ["format","bold","italic","lists","image","file","link","video","horizontalrule"],
	    "plugins": ["source","video","fullscreen","styleit"],
	    "toolbarFixed": true,
        "styleItJson": RedactorStyleIt.styleItJson
    }


That's about it.
 
 
### Options:

**btnName**: The unique name of the custom format. Required.

**className**: A CSS classname to assign to the associated option in the dropdown. Used to style how the option appears. Required.

**allowedIn**: A comma-seperated list of tags that this format is allowed to be used on.



Changelog
---

### Version 0.1
 - Initial public release
