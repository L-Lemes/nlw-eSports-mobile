import React, { useState } from 'react'

import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native'
import { CheckCircle } from 'phosphor-react-native'

import * as Clipboard from 'expo-clipboard'
import { MaterialIcons } from '@expo/vector-icons'

import { Headig } from '../Headig'

import { THEME } from '../../theme'

import { styles } from './styles'

interface Props extends ModalProps {
  discord: string
  onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState<boolean>(false)

  async function handleCopyDiscordToClipboard() {
    await Clipboard.setStringAsync(discord)

    Alert.alert(
      'Nick do Discord copiado!',
      'Nome de usuário copiado para facilitar a sua vida, meu amigo'
    )
    setIsCopping(true)
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={24}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Headig
            title="Let’s play!"
            subtitle="Agora é so começar a jogar"
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}></Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>{discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
