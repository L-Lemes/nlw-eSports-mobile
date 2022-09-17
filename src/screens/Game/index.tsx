import React, { useState, useEffect } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'

import { GameParams } from '../../@types/navigation'
import { Headig } from '../../components/Headig'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'
import { DuoMatch } from '../../components/DuoMatch'
import { Background } from '../../components/Background'

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme'
import { styles } from './styles'

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[] | null>([])
  const [discordDuoSlected, setDiscordDuoSlected] = useState<string>('')

  const route = useRoute()
  const navigation = useNavigation()

  const game = route.params as GameParams

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.18.14:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSlected(data.discord))
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.18.14:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right}></View>
        </View>
        <Image
          style={styles.cover}
          source={{ uri: game.bannerUrl }}
          resizeMode="cover"
        />
        <Headig title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos?.length == 0 ? styles.emptyListContent : styles.contentList
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Ainda não há anúncios para esse jogo
            </Text>
          )}
        />
        <DuoMatch
          visible={discordDuoSlected.length > 1}
          discord={discordDuoSlected}
          onClose={() => setDiscordDuoSlected('')}
        />
      </SafeAreaView>
    </Background>
  )
}
