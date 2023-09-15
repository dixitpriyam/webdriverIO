Feature: Test sanity suite
   As a developer
   I want to be able to test if track call works

    Scenario: Track call with all arguments works
        Given I open the url ""
        Then  I expect that the url is ""
        When  I wait on element ""
        When  I click on the element ""
        Then  I expect that element "" matches the text ""
        And   I expect a POST request to url "" responds with status 200 within 2000ms and payload dummyRequestBody
        And   I expect a POST request to url "" responds with status 200 within 2000ms and payload dummyRequestBody
