Feature: Proxy Star Wars API requests
	Scenario: Proxying a request to the Star Wars API
		Given I have the endpoint "/people/1/"
		When I make a request through the proxy
		Then I should receive the character's details