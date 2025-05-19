Feature: Add function
  Scenario: Adding two numbers
    Given I have a number 5
    And I have another number 3
    When I add them
    Then I get 8

  Scenario: Adding two others numbers
    Given I have a number 4
    And I have another number 2
    When I add them
    Then I get 6

  Scenario: Adding two numbers with Negative numbers
    Given I have a number -4
    And I have another number -2
    When I add them
    Then I get -6

  Scenario: Adding a negative and a positive number
    Given I have a number -5
    And I have another number 8
    When I add them
    Then I get 3

  Scenario: Adding with zero
    Given I have a number 0
    And I have another number 7
    When I add them
    Then I get 7

  Scenario: Adding two zeros
    Given I have a number 0
    And I have another number 0
    When I add them
    Then I get 0

  Scenario: Adding large numbers
    Given I have a number 1000
    And I have another number 2000
    When I add them
    Then I get 3000
