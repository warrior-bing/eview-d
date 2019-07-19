// pages/treeTest/treeTest.js
Page({
  data: {
    value: [
      {
        title: 'a-1',
        children: [
          {
            title: 'a-21',
            children: [
              {
                title: 'a-31',
                children: [
                  {
                    title: 'a-41'
                  }
                ]
              },
              {
                title: 'a-32'
              },
              {
                title: 'a-33'
              }
            ]
          },
          {
            title: 'a-22',
            children: [
              {
                title: 'a-31'
              },
              {
                title: 'a-32'
              }
            ]
          }
        ]
      },
      {
        title: 'b-1',
        children: [
          {
            title: 'b-21',
            children: [
              {
                title: 'b-31'
              },
              {
                title: 'b-32'
              },
              {
                title: 'b-33'
              }
            ]
          },
          {
            title: 'b-22',
            children: [
              {
                title: 'b-31'
              },
              {
                title: 'b-32'
              }
            ]
          }
        ]
      }
    ],
    unnormalizedValue: [
      {
        id: 1,
        title: '1'
      },
      {
        id: 2,
        pid: 1,
        title: '2'
      },
      {
        id: 3,
        pid: 1,
        title: '3'
      },
      {
        id: 4,
        pid: 2,
        title: '4'
      },
      {
        id: 5,
        pid: 4,
        title: '5'
      },
      {
        id: 6,
        pid: 5,
        title: '6'
      },
      {
        id: 7,
        title: '7'
      }
    ]
  },
  selThis(e) {
    console.log(e.detail);
  },
  
  onLoad() {
    let app = getApp()
    new app.Toast()
  }
});
