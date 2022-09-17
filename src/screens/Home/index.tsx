import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Background } from '../../components/Background'
import { GameCard, GameCardProps } from '../../components/GameCard'
import { Headig } from '../../components/Headig'

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    fetch('http://192.168.18.14:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Headig
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={intem => intem.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        ></FlatList>
      </SafeAreaView>
    </Background>
  )
}
