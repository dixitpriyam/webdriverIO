Feature: Test sanity suite
   As a developer
   I want to be able to test if the sanity suite passes

    # Scenario: Open the meesho URL and check search and price range functionality
    #     Given I open the url "https://www.meesho.com/"
    #     Then  I expect that the url is "https://www.meesho.com/"
    #     And I expect that the title is "Online Shopping Site for Fashion, Electronics, Home & More | Meesho"
    #     When  I wait on element ".search-input-elm"
    #     And   I click on the element "//input[@placeholder='Try Saree, Kurti or Search by Product Code']"
    #     When I set "smartwatches" to the inputfield "//input[@placeholder='Try Saree, Kurti or Search by Product Code']"
    #     When  I press "Enter"
    #     Then  I wait on element "//h1[text()='smartwatches']" for 70000ms to be displayed
    #     And   I click on the element "//span[text()='Price']"
    #     And   I pause for 5000ms
    #     When  I scroll to element "//p[text()='Under ₹ 399']"
    #     And   I click on the element "//p[text()='Under ₹ 399']"
    #     And   I pause for 5000ms
    #     And  I check all elements "//span[@class='sc-eDvSVe dwCrSh']" have value less than "399"

    Scenario: Open the meesho URL and sort functionality
        Given I open the url "https://www.meesho.com/"
        Then  I expect that the url is "https://www.meesho.com/"
        And I expect that the title is "Online Shopping Site for Fashion, Electronics, Home & More | Meesho"
        When  I wait on element ".search-input-elm"
        And   I click on the element "//input[@placeholder='Try Saree, Kurti or Search by Product Code']"
        When I set "smartwatches" to the inputfield "//input[@placeholder='Try Saree, Kurti or Search by Product Code']"
        When  I press "Enter"
        Then  I wait on element "//h1[text()='smartwatches']" for 70000ms to be displayed
        And   I click on the element "//span[text()='Relevance']"
        And   I click on the element "//span[text()='Price (High to Low)']"
        And   I pause for 5000ms
        And  I check all elements "//span[@class='sc-eDvSVe dwCrSh']" have value in descending order
        And   I pause for 5000ms

    Scenario: Open the meesho URL and sort functionality
        Given I open the url "https://www.amazon.com/"
        Then  I expect that the url is "https://www.amazon.com/"
        And I expect that the title is "Online Shopping Site for Fashion, Electronics, Home & More | Meesho"
    
    # Scenario Outline: The Prod v3 sanity suite must pass
    #     Then  I expect that element "<resultSelector>" matches the text "success"

    #     Examples:
    #         | resultSelector              |
    #         | #test-case-status-identify1 |
