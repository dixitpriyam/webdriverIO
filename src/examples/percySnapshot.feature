Feature: Percy Snapshot test sample
   As a developer
   I want to be able to test visual regression snapshots

    Background:
        Given I open the url ""
        Then  I expect that the title contains "The Warehouse Native Customer Data Platform"

    Scenario: I test percy snapshot
        Then I get a visual regression snapshot named as "test percy"
