Feature: API endpoint test sample
   As a developer
   I want to be able to test API endpoints

    Scenario: I test a sample endpoint with GET
        When I make a GET request to host "https://jsonplaceholder.typicode.com" API endpoint "/posts"
        Then I expect that the API response status is 200

    Scenario: I test a sample endpoint with POST
        When I make a POST request to host "https://jsonplaceholder.typicode.com" API endpoint "/posts" and payload test body
        Then I expect that the API response status is 201 and body is testBodyContents
