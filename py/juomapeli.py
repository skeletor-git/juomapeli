from os import system
import time
import random
import platform

players = ['Johannes','Skeletor','Muikku']
number_of_rounds = 50
max_difference_between_players_amount = 5
max_amount_of_drinks_at_once = 5
time_between_drinks = random.randint(15,30)

players_amount = [0] * len(players)

def speak(string):
	
	system("""osascript -e 'tell application "Spotify" to set sound volume to 70'""")
	time.sleep(0.1)
	system("""osascript -e 'tell application "Spotify" to set sound volume to 50'""")
	time.sleep(0.1)
	system("""osascript -e 'tell application "Spotify" to set sound volume to 35'""")
	time.sleep(0.2)
	system('say ' + string)
	time.sleep(0.2)
	system("""osascript -e 'tell application "Spotify" to set sound volume to 50'""")
	time.sleep(0.1)
	system("""osascript -e 'tell application "Spotify" to set sound volume to 90'""")
	time.sleep(0.1)
	system("""osascript -e 'tell application "Spotify" to set sound volume to 100'""")


def drink(player):
	amount = random.randint(1,max_amount_of_drinks_at_once)
	players_amount[player] = players_amount[player] + amount
	line = players[player] + ' juo ' + str(amount)
	speak(line)

def all_drink():
	amount = random.randint(1,max_amount_of_drinks_at_once)
	for i in range(0,len(players_amount)):
		players_amount[i] = players_amount[i] + amount
	line = 'Kaikki juo ' + str(amount)
	speak(line)

def results():
	speak('Tulokset')
	time.sleep(0.5)
	for player in range(0,len(players)):
		speak(players[player] + ' joi ' + str(players_amount[player]))
		time.sleep(0.1)
	speak('Paras suorittaja oli' + players[players_amount.index(max(players_amount))])
	speak('Huonoin suorittaja oli' + players[players_amount.index(min(players_amount))])

def main():
	system("""osascript -e 'tell application "Spotify" to set sound volume to 100'""")
	speak('Juomapeli alkaa')
	time.sleep(5)

	for rounds in range(1,number_of_rounds):

		jackpot = random.randint(1,15)
		if (jackpot == 1):
			all_drink()
		else:
			if (max(players_amount) - min(players_amount) > max_difference_between_players_amount):
				player = players_amount.index(min(players_amount))
			else:
				player = random.randint(0,len(players)-1)

			drink(player)

		print('Kierros: '+ str(rounds))
		print(players)
		print(players_amount)
		time_between_drinks = random.randint(15,30)
		time.sleep(time_between_drinks)

	speak('Juomapeli loppui')
	results()

main()
