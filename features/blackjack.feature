Feature: Jeu de cartes Blackjack

  Scenario: Création d'un deck de 52 cartes
    When je crée un deck de cartes
    Then le deck doit contenir 52 cartes

  Scenario: Distribution des cartes
    Given un deck mélangé
    When je distribue les cartes
    Then la main du joueur contient 2 cartes
    Then la main du croupier contient 2 cartes
    Then il reste 48 cartes dans le deck

  Scenario Outline: Calcul de la valeur d'une main
    Given la main "<main>"
    When je calcule la valeur de la main
    Then la valeur doit être <valeur>

    Examples:
      | main               | valeur |
      | ["A♠", "9♦"]       | 20     |
      | ["A♠", "K♣"]       | 21     |
      | ["5♦", "3♣", "2♥"] | 10     |
      | ["A♠", "A♦", "9♣"] | 21     |
      | ["A♠", "A♦", "8♣"] | 20     |
