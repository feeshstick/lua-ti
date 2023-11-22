
# Project Test Suite

This folder contains the test suite for the lua-ti. The test suite is divided into two main directories: `coherence` and `error`

## coherence

The basic directory houses tests that are designed to ensure the core functionalities of the project are correct. 
These tests are intended to always pass and validate the expected behavior of the code under normal circumstances. 
They are structured to handle specific and expected inputs, covering various scenarios, and are not meant to contain errors.

## error

The cases directory encompasses tests that are deliberately constructed to contain errors. 
These tests are aimed at verifying how the project handles exceptional cases, edge scenarios, and erroneous inputs. 
The purpose of these tests is to identify and rectify potential vulnerabilities, bugs, or unexpected behaviors within the codebase.