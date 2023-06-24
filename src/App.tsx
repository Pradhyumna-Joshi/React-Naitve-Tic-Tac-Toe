import React, {useState} from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar';

import Icons from './Components/Icons';

function App(): JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const resetScore = () => {
    reloadGame();
    setScore1(0);
    setScore2(0);
  };
  const checkWinner = () => {
    if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[1] &&
      gameState[1] === gameState[2]
    ) {
      setGameWinner(`${gameState[0]} won the game !! 🥳`);
      {
        isCross ? setScore2(score2 + 1) : setScore1(score1 + 1);
      }
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game !! 🥳`);
      {
        isCross ? setScore2(score2 + 1) : setScore1(score1 + 1);
      }
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game !! 🥳`);
      {
        isCross ? setScore2(score2 + 1) : setScore1(score1 + 1);
      }
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game !! 🥳`);
      {
        isCross ? setScore2(score2 + 1) : setScore1(score1 + 1);
      }
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game !! 🥳`);
      {
        isCross ? setScore2(score2 + 1) : setScore1(score1 + 1);
      }
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game !! 🥳`);
      {
        isCross ? setScore2(score2 + 1) : setScore1(score1 + 1);
      }
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game !! 🥳`);
      {
        isCross ? setScore2(score2 + 1) : setScore1(score1 + 1);
      }
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game !! 🥳`);
      {
        isCross ? setScore2(score2 + 1) : setScore1(score1 + 1);
      }
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner(`Draw game... ⏳`);
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFFF',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFF',
      });
    }

    checkWinner();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'} 's turn
          </Text>
        </View>
      )}

      <View style={styles.scoreCard}>
        <Text style={styles.scoreText}>Player 1(O) : {score1}</Text>
        <Text style={styles.scoreText}>Player 2(X) : {score2}</Text>
      </View>

      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />

      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload game'}
        </Text>
      </Pressable>

      <Pressable style={styles.gameBtn} onPress={resetScore}>
        <Text style={styles.gameBtnText}>Reset Score</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 7,
    padding: 16,
    marginVertical: 20,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    borderWidth: 2,
    borderColor: '#000',
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 20,
  },
  card: {
    height: 100,
    width: '32%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    margin: 2,
    borderRadius: 10,
    borderColor: '#A5A5A5',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 16,
    borderRadius: 7,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
    borderWidth: 2,
    borderColor: '#000',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  scoreCard: {
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  scoreText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    backgroundColor: '#8D3DAF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
});
export default App;
