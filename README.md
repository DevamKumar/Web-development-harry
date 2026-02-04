# Iron Mountain DXP SDK (dxp_sdk)

The DXP SDK is a Python library designed to simplify interactions with
the Iron Mountain Insight (DXP) API. It features a "Login Once, Run
Anywhere" architecture, allowing developers to focus on business logic
(uploading documents, managing assets) without worrying about
authentication headers in every script.

------------------------------------------------------------------------

## Architecture

This SDK uses a Persistent Session model similar to the AWS CLI or
Google Cloud SDK.

CLI Initialization (dxp_sdk init): You run this once in your terminal.
It securely saves your Access Token and Solution IDs to a hidden file on
your machine (\~/.dxp_sdk/session.json).

Auto-Loading: When you import the library in Python (import dxp_sdk), it
automatically finds that file, loads your credentials, and configures
the connection silently.

Result: Your scripts remain clean, secure, and devoid of hardcoded
passwords.

------------------------------------------------------------------------

## Installation

### Prerequisites

-   Python 3.8+
-   pip package manager

### Install via Distribution File or Public Repository

``` bash
pip3 install ./path/to/file/dxp_sdk_0.1.0.whl --force-reinstall
```

------------------------------------------------------------------------

# Setup (Do this ONCE)

Before running any Python scripts, you must initialize your environment
using the CLI tool included with the SDK.

## 1. Initialize Session

``` bash
dxp_sdk init
```

You will be prompted to enter your credentials.

Access Token: Paste your raw token string OR the path to a text file
containing the token (e.g., /Users/me/token.txt). Solution ID: Your
specific DXP SolutionID. Company ID: Your specific DXP CompanyID.
Solution Name: Your specific DXP Solution Name.

## 2. Verify Status

``` bash
dxp_sdk status
```

Output:

    ✅Active Session: {CompanyID} | {SolutionName}

------------------------------------------------------------------------

# API Reference Guide

This SDK provides a simple, object-oriented interface to interact with
DXP Resources. Below is a list of all available functions and how to use
them.

------------------------------------------------------------------------

# 1. Setup & Configuration (dxp_sdk)


+------------------------+-------------------------------+---------------------------------------------------------------------------------------------------------------------+
|        Function        |             Usage             |                                                     Description                                                     |
+------------------------+-------------------------------+---------------------------------------------------------------------------------------------------------------------+
| dxp_sdk.init()         | dxp_sdk.init()                | Interactive. Run the CLI wizard to set up credentials.(Same as running dxp_sdk init in the terminal).               |
| dxp_sdk.configure(...) | configure(access_token="...") | Manual. Manually sets credentials in code (bypasses the saved session file). Useful for serverless/CI environments. |
+------------------------+-------------------------------+---------------------------------------------------------------------------------------------------------------------+


------------------------------------------------------------------------

# 2. Case Operations

## Case.create(metadata, assetSubType)

Creates a new Case (Folder) to group assets together.

Behavior: You must explicitly define the assetSubType (usually "Case").

Parameters:

-   assetSubType (str): Must be set to "Case" (or your specific case
    type).

``` python
from dxp_sdk import Case

# Create a new Case
new_case = Case.create(
    name="SDK_Example_case_03feb_002",
    assetSubType="Case"
)

print(f"Case Created: {case_res.assetGUID}")
print(case_res)
```

------------------------------------------------------------------------

# 3. Asset Operations

These functions work for both uploaded Documents (Assets) and Cases.

------------------------------------------------------------------------

## Asset.create(file_path,assetSubType)

Uploads a physical file to DXP.

Behavior: This is designed specifically to trigger ingest workflows in
the DXP backend.

Parameters:

-   file_path (str): The absolute path to the file on your local
    machine.
-   assetSubType(str): The subtype of the asset(depends on solution).

``` python
from dxp_sdk import Document

# Uploads the file and triggers the "Unclassified" workflow
doc = Asset.create(
    file_path="/path/of/the/file.pdf",
    assetSubType="Unclassified"
)

print(f"Created Document GUID: {doc.assetGUID}")
print(doc)
```

------------------------------------------------------------------------

## Asset.get(assetGUID)

Retrieves full information and metadata for a specific Asset or Case.

Parameters:

-   assetGUID (str): The unique ID of the document or case.

``` python
from dxp_sdk import Asset

# Get info about a Document or a Case
asset_detail = Asset.get(
    assetGUID = "{assetGUID}"
)

print(f"Retrieved Asset: {asset_detail.fileName}")
print(asset_detail)
```

------------------------------------------------------------------------

## Asset.update(assetGUID, metadata)

Updates the metadata fields of an existing Asset or Case.

Behavior: Use this to modify index fields.

Parameters:

-   assetGUID (str): The unique ID of the item to update.
-   metadata (dict): Key-value pairs of the fields you want to update.

``` python
from dxp_sdk import Asset

# Update metadata for a Document OR a Case
update_res = Asset.update(
    assetGUID = "{assetGUID}",
    # example assetGUID = "b2d364ad-e73c-4645-xxxx-0f6fs35e5b2d"
    metadata={
        "Applicant_First_Name": "JOHN DOE"
    }
)

print(f"Update Status: {update_res.status}")
print(update_res)
```

------------------------------------------------------------------------

## Asset.search(query)

Filters and finds assets within the current Solution.

Behavior: Allows you to find assets based on specific criteria within
the solution.

Parameters:

-   query (dict): The filter criteria (e.g., matching a specific status
    or name).

``` python
from dxp_sdk import Asset

# Find all assets that match specific criteria
results = Asset.search(
    assetSubType="Driving_License"
)

print(f"Found {results.total} assets")
print(results)
```

------------------------------------------------------------------------

## Asset.download(assetGUID, save_path)

Downloads the actual file associated with an asset.

Parameters:

-   assetGUID (str): The unique ID of the file to download.
-   save_path (str): The local folder path where the file should be
    saved.

``` python
from dxp_sdk import Asset

# Download the file to your downloads folder
asset_download = Asset.download(
    assetGUID = "{assetGUID}",
    # example assetGUID="b2d364ad-e73c-4645-xxxx-0f6f037e5b2d",
    # local system path to save the document
    save_path="/path/to/save/asset/document.pdf"
)

print(asset_download)
```

------------------------------------------------------------------------

# CLI Reference

  
+----------------+------------------------------------------------------------------------------------+
|    Command     |                                    Description                                     |
+----------------+------------------------------------------------------------------------------------+
| dxp_sdk init   | Starts the interactive setup wizard.Saves credentials to \~/.dxp_sdk/session.json. |
| dxp_sdk status | Checks if a valid session exists and displays the current configuration.           |
| dxp_sdk --help | Shows available commands and usage instructions.                                   |
+----------------+------------------------------------------------------------------------------------+

------------------------------------------------------------------------

# Project Structure

    dxp_sdk/                    # Root Directory
    ├── pyproject.toml          # Build configuration & Dependencies
    ├── requirements.txt        # Python dependencies list
    ├── README.md               # This documentation
    │
    └── dxp_sdk/                # Source Code Package
        ├── __init__.py         # Handles "Auto-Load" logic (Magic Import)
        │
        ├── authorization/      # Authentication Logic
        │   ├── auth.py         # Logic for 'init()' interactive flow
        │   └── session.py      # Handles reading/writing JSON credentials to disk
        │
        ├── cli/                # Command Line Interface
        │   └── cli.py          # Entry point for the 'dxp_sdk' terminal command
        │
        ├── client/             # High-Level Client
        │   └── dxp_client.py   # Orchestrates SDK configuration & startup
        │
        ├── config/             # Configuration Management
        │   └── config.py       # Singleton class storing settings in memory
        │
        ├── http/               # Low-Level Networking
        │   └── http_client.py  # Wrapper for 'requests' (POST)
        │
        ├── models/             # Data Models & Schemas
        │   ├── dxp_object.py   # Base class for DXP objects
        │   └── request.py      # Request payload definitions
        │
        └── resources/          # API Resource Wrappers (Business Logic)
            ├── base.py         # Shared logic for all resources (CRUD bases)
            ├── asset.py        # Operations for Assets
            ├── case.py         # Operations for Cases

------------------------------------------------------------------------

# ❓ Troubleshooting

### Q: ModuleNotFoundError: No module named 'dxp_sdk'

Fix: Ensure you are running the script with the same Python version you
installed the library in. Try running this to verify.

``` bash
python3 -m dxp_sdk.cli init
```

------------------------------------------------------------------------

### Q: dxp_sdk: command not found

Fix: Your Python bin folder is not in your system PATH.

Workaround: You can always run the CLI using Python directly:

``` bash
python3 -m dxp_sdk.cli init
```

------------------------------------------------------------------------

### Q: Authorization Errors (401/403)

Fix: Your token might have expired. Simply run dxp_sdk init again to
paste a new token. The SDK will overwrite the old session file.
