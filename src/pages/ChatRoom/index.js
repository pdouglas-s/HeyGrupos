import React, { useState, useEffect } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Modal,
  ActivityIndicator,
  FlatList
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

import FabButton from '../../components/FabButton';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import ModalNewRoom from '../../components/ModalNewRoom';
import ChatList from '../../components/ChatList';

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);
  }, [isFocused]);

  useEffect(()=>{
    let isActive = true;

    function getChats(){
      firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('lastMessage.createAt', 'desc')
      .limit(10)
      .get()
      .then((snapshot)=>{
        const threads = snapshot.docs.map( documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            lastMessage: {text: '' },
            ...documentSnapshot.data()
          }
        })

        if(isActive){
          setThreads(threads);
          setLoading(false);
        }

      })
    }

    getChats();

    return () => {
      isActive = false;
    }

  }, [isFocused, updateScreen]);

  function handleSignOut(){
    auth()
    .signOut()
    .then((error)=>{
      setUser(null);
      navigation.navigate("SignIn")
    })
    .catch((error)=>{
      console.log("NAO POSSUI NENHUM USUARIO")
    })
  }

  if(loading){
    return(
      <ActivityIndicator size="large" color="#555" />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRomm}>
        <View style={styles.headerRoomLeft}>          
          { user && (            
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialIcons name="arrow-back" size={28} color="#FFF" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={threads}
        keyExtractor={ item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={ ({item}) => (
          <ChatList data={item} />
        )}
      />

      <FabButton setVisible={ () => setModalVisible(true)} userStatus={user} />

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalNewRoom 
          setVisible={ () => setModalVisible(false)} 
          setUpdateScreen={ () => setUpdateScreen(!updateScreen)}
        />
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  headerRomm:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2E54D4',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerRoomLeft:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  title:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    paddingLeft: 10,
  }
});
