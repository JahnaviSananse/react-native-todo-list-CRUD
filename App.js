import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  CheckBox,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SwipeListView } from 'react-native-swipe-list-view';
import { setItem, submitItem, deleteItem, deleteAll, toggle, toggleAll, checked, editData } from '../todo/reduxTodo/todoList/todo.action';
import { connect } from 'react-redux';
const App = ({ setItem, submitItem, getItem, getList, deleteItem, deleteAll, toggle, toggleAll, checked, editData }) => {
  const [textdata, setText] = React.useState("");
  const [isSelected, setSelection] = React.useState(false);
  var d = new Date();
  var n = d.toString();
  const [search, setSearch] = React.useState('');
  const [list, updatedList] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [updatedText, setUpdateText] = React.useState('');
  React.useEffect(() => {
    if (search !== '') {
      let ary = [];
      getList.map((mvalue) => {
        let n = mvalue.text.toLowerCase().search(search.toLowerCase());
        if (n !== -1) {
          ary.push(mvalue);
        }
      });
      updatedList(ary);
    }
    else if (search == '') {
      updatedList([]);
    }
  }, [search]);
  const renderDataList = ({ item, index }) => {
    return (
      <View style={styles.cell}>
        <View style={styles.listData}>
          <CheckBox
            value={item.isChecked}
            onValueChange={(e) => toggle(item.id)}
          />
          <Text
            style={styles.index}>
            {index + 1}
          </Text>
          <Text
            style={styles.name}>
            {item.text}
          </Text>
          <Text
            style={styles.time}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };
  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      weekDay = d.getDay();
    // time = d.getTime();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    var weekday2 = new Array(7);
    weekday2[0] = "Sunday";
    weekday2[1] = "Monday";
    weekday2[2] = "Tuesday";
    weekday2[3] = "Wednesday";
    weekday2[4] = "Thursday";
    weekday2[5] = "Friday";
    weekday2[6] = "Saturday";
    var n = weekday2[weekDay];
    const date1 = [day, month, year].join('-');
    return [n, date1].join('    ');
  }
  const renderHiddenItem = ({ item }) => (
    // console.log("getlist item :",getList),
    <View style={styles.HiddenButtonView}>
      <TouchableOpacity style={styles.deleteTouch}
        onPress={(e) => {
          return deleteItem(item.id)
        }}>
        <Text
          style={styles.deleteHide}>
          Delete
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editTouch}
        onPress={(e) => {
          setShow(!show)
          setEdit(item)
        }}  >
        <Text
          style={styles.editHide}>
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );
  const renderInput = () => (
    <View style={styles.updateView}>
      <TextInput
        onChangeText={text => setUpdateText(text)}
        editable={show}
        placeholder={edit.text}
        placeholderTextColor="grey"
        style={styles.updateTextInput}
      />
      <View style={styles.updateBtnView}>
        <TouchableOpacity onPress={(e) => { editData(edit.id, updatedText) }}>
          <Text style={styles.updateBtn}>
            UPDATE
    </Text>
        </TouchableOpacity></View>
    </View>
  );
  const dataList = (data, data2) => {
    return (
      <View style={styles.cellList}>
        {/* <TextInput
          placeholder={' search name from list'}
          onChangeText={(text) => {
            setSearch(text)
            return;
          }}
          placeholderTextColor="grey"
          style={styles.searchTextInput}
        /> */}
        <View>
          {show ? renderInput() : null}
          <View style={styles.checkAll}>
            <CheckBox
              value={checked}
              onValueChange={(e) => { toggleAll() }}
            />
            <TouchableOpacity onPress={(e) => { deleteAll() }}>
              <View style={styles.deleteAllView}>
                <Text style={styles.deleteAllbtn}>
                  Delete All
                 </Text>
              </View>
            </TouchableOpacity>
          </View>
          {console.log("data2", data2)}
          <SwipeListView
            data={list.length > 0 ? list : data}
            renderItem={renderDataList}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-175}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TextInput
          style={styles.textInput}
          placeholder="Type here to Add into list!"
          onChangeText={(text) => setText(text)}
          value={textdata}
        />
        <Button
          style={styles.buttonStyle}
          onPress={(e) => {
            let obj = {
              id: Math.random(),
              text: textdata,
              timestamp: formatDate(n),
              isChecked: false,
            }
            submitItem(obj)
          }}
          title="SUBMIT"
          color="grey"
        />
        {dataList(getList, list)}
        {/* {
          getList.map((item) => {
            return <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 5 }}>
              {item}
            </Text>
          })
        } */}
      </SafeAreaView>
    </>
  );
};
const mapStateToProps = (state) => ({
  getItem: state.todo.item,
  getList: state.todo.todoList,
  checked: state.todo.checked,
})
const mapDispatchToProps = dispatch => ({
  // setItem: (item) => dispatch(setItem(item)),
  submitItem: (item) => dispatch(submitItem(item)),
  deleteItem: (item) => dispatch(deleteItem(item)),
  deleteAll: () => dispatch(deleteAll()),
  toggle: (id) => dispatch(toggle(id)),
  toggleAll: () => dispatch(toggleAll()),
  editData: (id, text) => dispatch(editData({ id, text })),
})
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  textInput: {
    height: 50,
    backgroundColor: 'azure',
    fontSize: 20
  },
  updateBtnView: { width: 70, height: 35, backgroundColor: 'white', marginLeft: 35 },
  updateTextInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: '70%',
    height: '72%',
    fontSize: 15,
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  searchTextInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: '97.5%',
    height: '5%',
    fontSize: 15,
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  deleteAllbtn: {
    color: 'black',
    paddingLeft: 5,
    top: 5,
    fontWeight: 'bold'
  },
  deleteAllView: {
    width: '20%',
    height: '90%',
    backgroundColor: 'white',
    marginTop: 5,
    marginLeft: '76.3%'
  },
  checkAll: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    height: 35,
    width: '99%',
    marginLeft: 5
  },
  updateBtn: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 8,
    fontWeight: 'bold',
    paddingLeft: 9
  },
  updateView: {
    width: '100%',
    flexDirection: 'row'
  },
  editTouch: {
    width: '18%',
    marginLeft: 5,
    height: '50%',
    top: 5,
    backgroundColor: 'black'
  },
  deleteTouch: {
    width: '18%',
    marginLeft: '62.5%',
    height: '50%',
    top: 5,
    backgroundColor: 'white'
  },
  listData: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: '110%'
  },
  cell: {
    margin: 5,
    flexDirection: 'row',
  },
  cellList: {
    height: '100%',
    backgroundColor: 'grey',
    marginTop: 10,
    padding: 15,
  },
  HiddenButtonView: {
    height: 50,
    width: '100%',
    flexDirection: 'row'
  },
  name: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 20
  },
  time: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  index: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 5
  },
  deleteHide: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 4,
    paddingLeft: 12,
    height: 32,
    width: 70,
    backgroundColor: 'white',
  },
  editHide: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 4,
    paddingLeft: 24,
    width: 70,
    height: 32,
    backgroundColor: 'white',
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
