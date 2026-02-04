**Iron Mountain DXP SDK (dxp\_sdk)**
====================================

The **DXP SDK** is a Python library designed to simplify interactions with the Iron Mountain Insight (DXP) API. It features a **"Login Once, Run Anywhere"** architecture, allowing developers to focus on business logic (uploading documents, managing assets) without worrying about authentication headers in every script.

**Architecture**
----------------

This SDK uses a **Persistent Session** model similar to the AWS CLI or Google Cloud SDK.

1.  **CLI Initialization (dxp\_sdk init)**: You run this _once_ in your terminal. It securely saves your Access Token and Solution IDs to a hidden file on your machine (~/.dxp\_sdk/session.json).
    
2.  **Auto-Loading**: When you import the library in Python (import dxp\_sdk), it automatically finds that file, loads your credentials, and configures the connection silently.
    
3.  **Result**: Your scripts remain clean, secure, and devoid of hardcoded passwords.
    

**Installation**
----------------

### **Prerequisites**

*   Python 3.8+
    
*   pip package manager
    

### **Install via Distribution File or Public Repository** 

pip3 install ./path/to/file/dxp\_sdk\_0.1.0.whl --force-reinstall

**Setup (Do this ONCE)**
------------------------

Before running any Python scripts, you must initialize your environment using the CLI tool included with the SDK.

### **1\. Initialize Session**

Open your terminal and run:

dxp\_sdk init

You will be prompted to enter your credentials.

*   **Access Token**: Paste your raw token string OR the path to a text file containing the token (e.g., /Users/me/token.txt).
    
*   **Solution ID**: Your specific DXP SolutionID.
    
*   **Company ID:** Your specific DXP CompanyID.
    
*   **Solution Name**: Your specific DXP Solution Name.
    

### **2\. Verify Status**

To confirm you are connected:

dxp\_sdk status

_Output:_

✅Active Session: {CompanyID} | {SolutionName}

**API Reference Guide**
=======================

This SDK provides a simple, object-oriented interface to interact with DXP Resources. Below is a list of all available functions and how to use them.

**1\. Setup & Configuration (dxp\_sdk)**
----------------------------------------

These functions manage your connection to the Iron Mountain DXP environment.

**Function**

**Usage**

**Description**

**dxp\_sdk.init()**

dxp\_sdk.init()

**Interactive.** Run the CLI wizard to set up credentials. (Same as running dxp\_sdk init in the terminal).

**dxp\_sdk.configure(...)**

configure(access\_token="...")

**Manual.** Manually sets credentials in code (bypasses the saved session file). Useful for serverless/CI environments.

**2\. Case Operations**
-----------------------

### Case.create(metadata, assetSubType)

Creates a new Case (Folder) to group assets together.

*   Behavior: You must explicitly define the assetSubType (usually "Case").
    
*   Parameters:
    
    *   assetSubType (str): Must be set to "Case" (or your specific case type).
        

from dxp\_sdk import Case

\# Create a new Case

new\_case = Case.create(

name="SDK\_Example\_case\_03feb\_002",

assetSubType="Case"

)

print(f"Case Created: {case\_res.assetGUID}")

print(case\_res)

**3\. Asset Operations**
------------------------

These functions work for both uploaded Documents (Assets) and Cases.

### Asset.create(file\_path,assetSubType)

Uploads a physical file to DXP.

*   Behavior: This is designed specifically to trigger ingest workflows in the DXP backend.
    
*   Parameters:
    
    *   file\_path (str): The absolute path to the file on your local machine.
        
    *   assetSubType(str): The subtype of the asset(depends on solution).
        

\# Example for document operation.

from dxp\_sdk import Document

\# Uploads the file and triggers the "Unclassified" workflow

doc = Asset.create(

file\_path="/path/of/the/file.pdf",

assetSubType="Unclassified"

)

print(f"Created Document GUID: {doc.assetGUID}")

print(doc)

### Asset.get(assetGUID)

Retrieves full information and metadata for a specific Asset or Case.

*   Parameters:
    
    *   assetGUID (str): The unique ID of the document or case.
        

from dxp\_sdk import Asset

\# Get info about a Document or a Case

asset\_detail = Asset.get(

    assetGUID = "{assetGUID}"

)

print(f"Retrieved Asset: {asset\_detail.fileName}")

print(asset\_detail)

### Asset.update(assetGUID, metadata)

Updates the metadata fields of an existing Asset or Case.

*   Behavior: Use this to modify index fields.
    
*   Parameters:
    
    *   assetGUID (str): The unique ID of the item to update.
        
    *   metadata (dict): Key-value pairs of the fields you want to update.
        

Python

from dxp\_sdk import Asset

\# Update metadata for a Document OR a Case

update\_res = Asset.update(

    assetGUID = "{assetGUID}", 

\# example assetGUID = "b2d364ad-e73c-4645-xxxx-0f6fs35e5b2d"

    metadata={

"Applicant\_First\_Name": "JOHN DOE"

    }

)

print(f"Update Status: {update\_res.status}")

print(update\_res)

### Asset.search(query)

Filters and finds assets within the current Solution.

*   Behavior: Allows you to find assets based on specific criteria within the solution.
    
*   Parameters:
    
    *   query (dict): The filter criteria (e.g., matching a specific status or name).
        

from dxp\_sdk import Asset

\# Find all assets that match specific criteria

results = Asset.search(

    assetSubType="Driving\_License"

    )

print(f"Found {results.total} assets")

print(results)

### Asset.download(assetGUID, save\_path)

Downloads the actual file associated with an asset.

*   Parameters:
    
    *   assetGUID (str): The unique ID of the file to download.
        
    *   save\_path (str): The local folder path where the file should be saved.
        

Python

from dxp\_sdk import Asset

\# Download the file to your downloads folder

asset\_download = Asset.download(

assetGUID = "{assetGUID}",

\# example assetGUID="b2d364ad-e73c-4645-xxxx-0f6f037e5b2d",

\# local system path to save the document

save\_path="/path/to/save/asset/document.pdf" 

)

print(asset\_download)

**CLI Reference**
-----------------

The SDK comes with a command-line tool dxp\_sdk.

**Command**

**Description**

dxp\_sdk init

Starts the interactive setup wizard. Saves credentials to ~/.dxp\_sdk/session.json.

dxp\_sdk status

Checks if a valid session exists and displays the current configuration.

dxp\_sdk --help

Shows available commands and usage instructions.

**Project Structure**
---------------------

For developers contributing to the SDK, here is how the code is organized:

dxp\_sdk/# Root Directory

├── pyproject.toml# Build configuration & Dependencies

├── requirements.txt# Python dependencies list

├── [README.md](http://readme.md/)\# This documentation

│

└── dxp\_sdk/# Source Code Package

    ├── \_\_init\_\_.py# Handles "Auto-Load" logic (Magic Import)

    │

    ├── authorization/# Authentication Logic

    │   ├── auth.py# Logic for 'init()' interactive flow

    │   └── session.py# Handles reading/writing JSON credentials to disk

    │

    ├── cli/# Command Line Interface

    │   └── cli.py# Entry point for the 'dxp\_sdk' terminal command

    │

    ├── client/# High-Level Client

    │   └── dxp\_client.py# Orchestrates SDK configuration & startup

    │

    ├── config/# Configuration Management

    │   └── config.py# Singleton class storing settings in memory

    │

    ├── http/# Low-Level Networking

    │   └── http\_client.py# Wrapper for 'requests' (POST)

    │

    ├── models/# Data Models & Schemas

    │   ├── dxp\_object.py# Base class for DXP objects

    │   └── request.py# Request payload definitions

    │

    └── resources/# API Resource Wrappers (Business Logic)

        ├── base.py# Shared logic for all resources (CRUD bases)

        ├── asset.py# Operations for Assets

        ├── case.py# Operations for Cases

        └── document.py# Operations for Documents

**❓ Troubleshooting**
---------------------

**Q: ModuleNotFoundError: No module named 'dxp\_sdk'**

*   **Fix:** Ensure you are running the script with the same Python version you installed the library in. Try running this to verify.
    

python3 -m dxp\_sdk.cli init

**Q: dxp\_sdk: command not found**

*   **Fix:** Your Python bin folder is not in your system PATH.
    
*   **Workaround:** You can always run the CLI using Python directly:
    

python3 -m dxp\_sdk.cli init

**Q: Authorization Errors (401/403)**

*   **Fix:** Your token might have expired. Simply run dxp\_sdk init again to paste a new token. The SDK will overwrite the old session file.
