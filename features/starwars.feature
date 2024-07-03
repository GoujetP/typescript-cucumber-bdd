Feature: Get Star Wars character
    Scenario: Getting a character by ID
        Given I have the character ID 1
        When I retrieve the character
        Then I should see the character's details