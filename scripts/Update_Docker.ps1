## Release Notes: Script for Docker upload

This Guide explains how to use the script for Docker upload

## Requirements:

# Git for Windows
Git for Windows focuses on offering a lightweight, native set of tools that bring the full feature set of the Git SCM to Windows while providing appropriate user interfaces for experienced Git users and novices alike.

Download: https://github.com/git-for-windows/git/releases/download/v2.23.0.windows.1/Git-2.23.0-64-bit.exe

# Docker CLI
Docker CLI - You must also have Docker installed locally. Docker provides packages that easily configure Docker on any macOS, Windows, or Linux system.

Dowload: https://docs.docker.com/docker-for-windows/

# Azure CLI
For Windows the Azure CLI is installed via an MSI, which gives you access to the CLI through the Windows Command Prompt (CMD) or PowerShell.

Download: https://aka.ms/installazurecliwindows

# Powershell
Windows PowerShell comes installed by default in every Windows, starting with Windows 7 SP1 and Windows Server 2008 R2 SP1.

## Script
$user = Read-Host -Prompt 'Input the user name'
$branch = Read-Host -Prompt 'Input your server  name'
$Date = Get-Date

Write-Host "Chekcing Scm '$branch' and '$user' on '$Date'" 

# Go to location 
Set-Location C:\

   # Create temp folder
   mkdir GitTemp
   cd GitTemp
   # Clone Git repository
   git clone https://$user@bitbucket.endava.com/scm/in/interviews.git

   # Set Branch
   git branch $branch


## Login to Azure

	az acr login --name interviewsregistry

##Connect-AzAccount

	$registry = interviewsregistry.azurecr.io

	$creds = Get-AzContainerRegistryCredential -Registry $registry

## Docker Build of image ## Docker Tag as Latest

	docker build -t interviews-server

## Docker Push

	docker push interviewsregistry.azurecr.io/interviews-server:latest

## Update of K8S Deployment with new image latest

	kubectl set image deployment/interviews-server interviews-server=interviewsregistry.azurecr.io/interviews-server:latest --record
	kubectl get nodes




