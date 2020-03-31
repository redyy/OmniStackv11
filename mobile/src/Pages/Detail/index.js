import React, {useState, useEffect} from 'react';
import { Feather,MaterialCommunityIcons } from '@expo/vector-icons'
import {View, Image, Text, ScrollView, SafeAreaView, TouchableOpacity, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Detail(){
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Ola ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(incident.value)} euros`

  function navigateBack(){
    navigation.goBack();
  }


  function sendMail(){
    MailComposer.composeAsync({
      subject: `${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=351937215990&text=${message}`)
  }

  return(
    <ScrollView 
        scrollEnabled={true}
        showsVerticalScrollIndicator= {false}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041"/>
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Associação:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
         
          <Text style={styles.incidentProperty}>Caso:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>
          
          <Text style={styles.incidentProperty}>Valor Necessário:</Text>
          <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(incident.value)}</Text>
          <Text style={styles.incidentProperty}>Descrição</Text>
          <Text style={styles.incidentValue}>{incident.description}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.wpp} onPress={sendWhatsapp}>
            <MaterialCommunityIcons name="whatsapp" size={28} color="#fff"/>
          </TouchableOpacity>
            
          <TouchableOpacity style={styles.email} onPress={sendMail}>
           <MaterialCommunityIcons name="gmail" size={28} color="#fff"/>
          </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  )
}