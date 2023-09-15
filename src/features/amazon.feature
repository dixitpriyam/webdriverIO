Feature: Test sanity suite
   As a developer
   I want to be able to test if the sanity suite passes

    Background:
        Given I open the url "https://www.amazon.com/"
        When I clear site data
        Then  I expect that the url is "https://www.amazon.com/"

    # Scenario: Open the Amazon URL and test functionality
    #     And I expect that the title is "Amazon.com. Spend less. Smile more."
    #     When  I wait on element "//input[@name='field-keywords']"
    #     And   I click on the element "//input[@name='field-keywords']"
    #     When I set "smartwatches" to the inputfield "//input[@name='field-keywords']"
    #     When  I press "Enter"
    #     Then  I expect that element "//span[@class='a-color-state a-text-bold']" contains the text "smartwatches"
    #     And   I click on the element "//span[text()='Amazfit']"
    #     Then  I expect that element "//span[@class='a-size-medium a-color-base a-text-normal'][1]" contains the text "Amazfit"
    #     # And   I pause for 60000ms
    #     # Then I scroll to element "#low-price"
    #     # When I set "1" to the inputfield "#low-price"
    #     # When I set "40" to the inputfield "#high-price"
    #     # Then  I expect that element "//span[@class='a-size-medium a-color-base a-text-normal'][1]" contains the text "Amazfit"
    #     # And   I pause for 60000ms
    #     And   I click on the element "//span[@class='a-dropdown-label']"
    #     And   I click on the element "//a[text()='Price: High to Low']"
    #     And   I pause for 2000ms
    #     And   I click on the element "//div[@data-cel-widget='search_result_1']//div[@class='a-section']//div[@class='sg-col-inner'][1]"
    #     When  I wait on element "#breadcrumb-back-link"
    #     And   I click on the element "#add-to-cart-button"
    #     And   I click on the element "#nav-cart"
    #     Then  I expect that element "//div[@class='a-row sc-cart-header']/div/h1" contains the text "Shopping Cart"
    #     Then  I expect that element "//div[@class='a-row sc-cart-header']/div/h1" not contains the text "Your Amazon Cart is empty."


    Scenario Outline: Open the Amazon URL and test functionality
        And I expect that the title is "Amazon.com. Spend less. Smile more."
        When  I wait on element "//input[@name='field-keywords']"
        And   I click on the element "//input[@name='field-keywords']"
        When I set "smartwatches" to the inputfield "//input[@name='field-keywords']"
        When  I press "Enter"
        Then  I expect that element "//span[@class='a-color-state a-text-bold']" contains the text "smartwatches"
        And   I pause for 2000ms
        And   I click on the element "//span[@class='a-expander-prompt' and text()='See more'][1]"
        Then I scroll to element "//span[text()='<brandName>']"
        And   I click on the element "//span[text()='<brandName>']"
        And   I pause for 2000ms
        Then  I expect that element "//span[@class='a-size-medium a-color-base a-text-normal'][1]" contains the text "<brandName>"
        And   I pause for 2000ms
        # Then I scroll to element "#low-price"
        # When I set "1" to the inputfield "#low-price"
        # When I set "40" to the inputfield "#high-price"
        # Then  I expect that element "//span[@class='a-size-medium a-color-base a-text-normal'][1]" contains the text "Amazfit"
        # And   I pause for 60000ms
        And   I click on the element "//span[@class='a-dropdown-label']/parent::*"
        And   I click on the element "//a[text()='Price: High to Low']"
        And   I pause for 2000ms
        And   I click on the element "//span[@class='a-price-whole'][1]"
        When  I wait on element "#breadcrumb-back-link"
        And   I click on the element "#add-to-cart-button"
        And   I pause for 2000ms
        And   I click on the element "#nav-cart"
        Then  I expect that element "//div[@class='a-row sc-cart-header']/div/h1" contains the text "Shopping Cart"
        Then  I expect that element "//div[@class='a-row sc-cart-header']/div/h1" not contains the text "Your Amazon Cart is empty."
        And   I click on the element "//input[@value='Delete']"
        And   I pause for 2000ms
        Then  I expect that element "//div[@class='a-row sc-cart-header']/div/h1" contains the text "Your Amazon Cart is empty."
        And   I pause for 2000ms
        Examples:
            | brandName |
            | Amazfit |
            | SAMSUNG |
