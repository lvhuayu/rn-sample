const React = require('react-native');

//获取可视窗口的宽高
var util = require('../../common/util.js');
var {
    width, height, scale
} = util.getDimensions();

module.exports = React.StyleSheet.create({
    main: {
        flex: 1
    },
    summaryWrapper: {
        paddingBottom: 36
    },
    orderTitle: {
        paddingVertical: 16,
        paddingLeft: 16,
        fontSize: 18
    },
    taskTotalTextTop: {
        textAlign:'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    taskTotalTextBottom: {
        textAlign:'center',
        paddingTop: 5
    },
    taskTotalImageTop: {
        paddingTop: 10,
        paddingBottom: 10
    },
    rowStyle: {
        paddingRight: 16,
        paddingVertical: 0,
        // borderBottomColor: '#E0E0E0',
        // borderBottomWidth: 1 / React.PixelRatio.get(),
        flex: 1,
        flexDirection: 'row'
    },
    taskDetailCheckIcon:{
        // position: 'absolute',
        // left: 16,
        // top: 16
    },
    checkIconWrapper: {
        width: 36,
        height: 36,
        marginLeft: 15,
        marginTop: 20,
        marginRight: 16
    },
    checkIcon: {
        width: 32,
        height: 32,
        marginTop: 2,
        marginLeft: 2
    },
    checkIcon24: {
        width: 24,
        height: 24,
        marginTop: 6,
        marginLeft: 6
    },
    checkIcon36: {
        width: 36,
        height: 36,
        marginTop: 2,
        marginLeft: 2
    },
    contentWrapper: {
        paddingVertical: 16,
        flex: 1,
        flexDirection: 'column'
    },
    timeLabel: {
        textAlign: 'right'
    },
    taskItemCircle: {
        width: 36,
        height: 36,
        marginTop: 16,
        borderRadius: 18
    },
    taskItemTitle:{
        position: 'absolute',
        width: 30,
        textAlign: 'center',
        left: 3,
        top: 12,
        color: '#fff',
        fontSize: 12
    },
    taskDetailTop: {
        // height: 60,
        width: width,
        flexDirection: 'row'
    },
    contentTop:{
        flex: 1
    },
    contentBottom:{
        flex: 1,
        flexDirection: 'row'
    },
    taskTitle: {
        paddingRight: 16,
        marginTop: 16,
        textAlign: 'left',
        fontSize: 18,
        flex: 1
    },
    taskDetailDescribe: {
        alignItems: 'center',
        width: width,
        marginTop: 16
    },
    swipeWrapper:{
        backgroundColor: 'transparent'
    },
    timelineWrapper:{
        width: 4 / React.PixelRatio.get(),
        position: 'absolute',
        left: 32,
        top: 0,
        bottom: 0,
        flexDirection: 'column'
    },
    timeline: {
        flex: 1,
        width: 4 / React.PixelRatio.get(),
        height: 50,
        backgroundColor: '#d5d5d5'
    },
    timelineDone: {
        backgroundColor: '#34a853'
    },
    rowTitle: {
        fontSize: 16
    },
    rowText: {
        color: '#212121',
        fontSize: 16,
        paddingBottom: 10
    },
    rowTextSmall: {
        color: '#212121',
        fontSize: 12,
        paddingBottom: 10
    },
    rowTextDetail: {
        fontSize: 14
    },
    rowTextDetailLeft: {
        flex: 1
    },
    rowTextDetailRight: {
        flex: 1
    },
    attachImageWrapper: {
        alignItems: 'center'
        // paddingHorizontal: 64
    },
    attachImage: {
        width: 80,
        height: 80,
        marginLeft: 16,
        marginRight: 16
    },
    attachImageMiddle: {
        width: width - 32,
        height: height / 2
    },
    attachTitle: {
        // height: 54,
        // paddingVertical: 16,
        padding: 16,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '800'
    },
    attachItemText: {
        flex: 1,
        fontSize: 16,
        justifyContent: 'center'
    },
    newsTimeline: {
        width: 2,
        position: 'absolute',
        left: 67,
        top: 0,
        bottom: 0,
        backgroundColor: '#d5d5d5'
    },
    newsTag: {
        // width: 10,
        // height: 10,
        // backgroundColor: 'red',
        // borderRadius: 5,
        position: 'absolute',
        top: 25,
        left: 62
    },
    newsTagGray: {
        // width: 24,
        // height: 24,
        // backgroundColor: '#bdbdbd',
        // borderRadius: 12,
        position: 'absolute',
        top: 20,
        left: 62
    },
    borderLeft: {
        borderLeftColor: '#bdbdbd',
        borderLeftWidth: 2 / React.PixelRatio.get()
    },
    newsItemAvatar: {
        width: 36,
        height: 36,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 32,
        borderRadius: 18
    },
    newsSectionHeder: {
        padding: 16,
        backgroundColor: '#fff'
    },
    newsSectionText: {
        marginLeft: 68
    },
    webView:{
        width: width,
        height: height,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    imageGalleryWrapper: {
        height: height - 64
    },
    imageGallery:{
        width: width,
        height: height - 64
    },
    pieContainer: {
        width: width-32,
        height: width-32,
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16

    },
    descWrapper: {
        width: width-32,
        marginHorizontal: 16,
        // height: 48,
        backgroundColor: '#000',
        alignItems: 'center'
    },
    barChartContainer: {
        flexDirection: 'row',
        width: width,
        height: 165,
        paddingTop: 16,
        paddingHorizontal: 16,
        borderBottomWidth:1 / React.PixelRatio.get(),
        borderBottomColor:'#d5d5d5',
        borderTopWidth:1 / React.PixelRatio.get(),
        borderTopColor:'#d5d5d5'
    },
    barItemWrapper: {
        height: 150,
        width: (width-32)/7
        // marginLeft: 25
    },
    barItem: {
        position: 'absolute',
        bottom: 0,
        left: ((width-32)/7 - 20)/2,
        width: 20,
        backgroundColor: '#4285f4'
    },
    barItemText: {
        // flex: 1,
        fontSize: 12,
        width: (width-32)/7,
        // backgroundColor: '#000',
        paddingBottom: 5,
        textAlign: 'center'
    },
    addButtonWrapper: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: width/2 - 28,
        bottom: 10
    },
    addButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#4285f4',
        alignItems: 'center',
        justifyContent: 'center'

    },
    sepLine: {
        width: width - 32,
        marginHorizontal: 16,
        backgroundColor: '#eee',
        height: 1
    },
    summarySection: {
        width: width-32,
        marginHorizontal: 16
    },
    recordNum: {
        height: 44,
        marginVertical: 20,
        textAlign: 'center',
        color: '#4285f4',
        borderBottomWidth:1 / React.PixelRatio.get(),
        borderBottomColor:'#d5d5d5'
    },
    recordsDesc: {
        width: width-32,
        marginHorizontal: 16,
        height: 64,
        marginVertical: 20,
        color: '#212121'
    }
});
