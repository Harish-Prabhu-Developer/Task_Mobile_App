export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    subRole: string | null;
  }
  
  export interface Activity {
    _id: string;
    type: string;
    activity?: string;
    by: User;
    date: string;
    __v: number;
  }
  
  export interface SubTask {
    _id: string;
    title: string;
    date: string;
    tag: string;
  }
  export interface createdByProject {
    _id: string;
    name: string;
    role:string;
    email: string;
  }
  export interface Project {
    _id: string;
    name: string;
    description: string;
    createdBy: createdByProject;
    teamMembers: string[];
    startDate: string;
    tasks: string[];
    endDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
    __v: number;
  }
  
  export interface Task {
    _id: string;
    title: string;
    description: string;
    assignedTo: User[];
    priority: string;
    stage: string;
    activities: Activity[];
    subTasks: SubTask[];
    assets: any[];
    project: Project;
    dueDate: string;
    logs: any[];
    comments: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export const Task_Data: Task[] = [
    {
        _id: '67d13cc9dfdfb3927a12f10a',
        title: 'Design Homepage UI',
        description: 'fkld;ksl;kdl;f',
        assignedTo: [
          {
            _id: '67ab3dc1d68d47ff5b59bc04',
            name: 'Rajesh Kumar',
            email: 'RajeshKumar@swomb.app',
            role: 'Junior',
            subRole: 'developer',
          },
          {
            _id: '67a9f0539b60506b2ca2e91e',
            name: 'Lalith',
            email: 'Lalith@swomb.app',
            role: 'Junior',
            subRole: 'designer',
          },
        ],
        priority: 'high',
        stage: 'completed',
        activities: [
          {
            _id: '67d2c101c746d1817165b5c8',
            type: 'Assigned',
            activity: 'Assigned',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-13T11:26:57.763Z',
            __v: 0,
          },
          {
            _id: '67d2c17dc746d1817165b5f5',
            type: 'Started',
            activity: 'Started',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-13T11:29:01.302Z',
            __v: 0,
          },
          {
            _id: '67d2c19dc746d1817165b60a',
            type: 'In Progress',
            activity: 'In Progress',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-13T11:29:33.413Z',
            __v: 0,
          },
          {
            _id: '67d31beeeffb401cc7c9290f',
            type: 'Started',
            activity: 'I am Started',
            by: {
              _id: '67ab3dc1d68d47ff5b59bc04',
              name: 'Rajesh Kumar',
              email: 'RajeshKumar@swomb.app',
              role: 'Junior',
              subRole: 'developer',
            },
            date: '2025-03-13T17:54:54.840Z',
            __v: 0,
          },
          {
            _id: '67d31c31effb401cc7c92934',
            type: 'In Progress',
            activity: 'I am Code Login Page',
            by: {
              _id: '67ab3dc1d68d47ff5b59bc04',
              name: 'Rajesh Kumar',
              email: 'RajeshKumar@swomb.app',
              role: 'Junior',
              subRole: 'developer',
            },
            date: '2025-03-13T17:56:01.044Z',
            __v: 0,
          },
          {
            _id: '67d3c4872af7af23e36c4a4d',
            type: 'Assigned',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-14T05:54:15.613Z',
            __v: 0,
          },
          {
            _id: '67d3c49d2af7af23e36c4bfc',
            type: 'Assigned',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-14T05:54:37.083Z',
            __v: 0,
          },
          {
            _id: '67de7a058b0492a877e840eb',
            type: 'Assigned',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-22T08:51:17.825Z',
            __v: 0,
          },
          {
            _id: '67de7ad18b0492a877e84192',
            type: 'Bug',
            activity: 'Login Bug',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-22T08:54:41.850Z',
            __v: 0,
          },
          {
            _id: '67de7bb78b0492a877e84de4',
            type: 'Completed',
            activity: 'Login fixed',
            by: {
              _id: '67ab3dc1d68d47ff5b59bc04',
              name: 'Rajesh Kumar',
              email: 'RajeshKumar@swomb.app',
              role: 'Junior',
              subRole: 'developer',
            },
            date: '2025-03-22T08:58:31.474Z',
            __v: 0,
          },
        ],
        subTasks: [
          {
            title: 'Fix Login Issue',
            date: '2025-03-15T00:00:00.000Z',
            tag: 'Bug Fix',
            _id: '67d14ccdac096233dee7efe7',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2724570ef5c01032f6a24',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2763670ef5c01032f6fe9',
          },
          {
            title: 'Fix Login Issue',
            date: '2025-03-15T00:00:00.000Z',
            tag: 'Bug Fix',
            _id: '67d14ccdac096233dee7efe7',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2724570ef5c01032f6a24',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2763670ef5c01032f6fe9',
          },
          {
            title: 'Fix Login Issue',
            date: '2025-03-15T00:00:00.000Z',
            tag: 'Bug Fix',
            _id: '67d14ccdac096233dee7efe7',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2724570ef5c01032f6a24',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2763670ef5c01032f6fe9',
          },
          {
            title: 'Fix Login Issue',
            date: '2025-03-15T00:00:00.000Z',
            tag: 'Bug Fix',
            _id: '67d14ccdac096233dee7efe7',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2724570ef5c01032f6a24',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2763670ef5c01032f6fe9',
          },
          {
            title: 'Design Homepage UI',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'OK',
            _id: '67d5277ff8212b67b3d1cb3c',
          },
          {
            title: 'Fix Login Issue',
            date: '2025-03-15T00:00:00.000Z',
            tag: 'Bug Fix',
            _id: '67d14ccdac096233dee7efe7',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2724570ef5c01032f6a24',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2763670ef5c01032f6fe9',
          },
          {
            title: 'Fix Login Issue',
            date: '2025-03-15T00:00:00.000Z',
            tag: 'Bug Fix',
            _id: '67d14ccdac096233dee7efe7',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2724570ef5c01032f6a24',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2763670ef5c01032f6fe9',
          },
          {
            title: 'Fix Login Issue',
            date: '2025-03-15T00:00:00.000Z',
            tag: 'Bug Fix',
            _id: '67d14ccdac096233dee7efe7',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2724570ef5c01032f6a24',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2763670ef5c01032f6fe9',
          },
          {
            title: 'Fix Login Issue',
            date: '2025-03-15T00:00:00.000Z',
            tag: 'Bug Fix',
            _id: '67d14ccdac096233dee7efe7',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2724570ef5c01032f6a24',
          },
          {
            title: 'Test2',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'testing',
            _id: '67d2763670ef5c01032f6fe9',
          },
          {
            title: 'Design Homepage UI',
            date: '2025-03-20T00:00:00.000Z',
            tag: 'OK',
            _id: '67d5277ff8212b67b3d1cb3c',
          },
        ],
        assets: [],
        project: {
          _id: '67bdbe79357b0b90de229557',
          name: 'Mobile App Development',
          description: 'Build a cross-platform mobile app',
          createdBy: {_id: '67a9edafc1be67b40b7cf3dd', name: 'Harish Admin', email: 'skcbcastudent@gmail.com', role: 'Admin'},
          teamMembers: [
            '67ab3dc1d68d47ff5b59bc04',
            '67ab3da9d68d47ff5b59bbff',
            '67b42a4583c07b12eb620b55',
            '67a9f03a9b60506b2ca2e919',
            '67a9f0539b60506b2ca2e91e',
          ],
          startDate: '2025-03-01T00:00:00.000Z',
          tasks: [
            '67d13cc9dfdfb3927a12f10a',
            '67d2dd6cbb339918ddfe2046',
            '67d41bbcc41ac4fdd8c01836',
          ],
          endDate: '2025-09-01T00:00:00.000Z',
          status: 'In Progress',
          createdAt: '2025-02-25T12:58:33.155Z',
          updatedAt: '2025-03-22T08:51:17.866Z',
          __v: 29,
          updatedBy: '67a9edafc1be67b40b7cf3dd',
        },
        dueDate: '2025-03-26T00:00:00.000Z',
        logs: [],
        comments: [],
        createdAt: '2025-03-12T07:50:33.815Z',
        updatedAt: '2025-03-22T08:58:31.485Z',
        __v: 0,
      },
      {
        _id: '67d2dd6cbb339918ddfe2046',
        title: 'Mobile App',
        description: 'Testing',
        assignedTo: [
          {
            _id: '67a9f03a9b60506b2ca2e919',
            name: 'Ganesh',
            email: 'Ganesh@swomb.app',
            role: 'Senior',
            subRole: 'designer',
          },
        ],
        priority: 'medium',
        stage: 'in progress',
        activities: [
          {
            _id: '67d2dd6cbb339918ddfe2044',
            type: 'Assigned',
            activity: 'Task assigned',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-13T13:28:12.294Z',
            __v: 0,
          },
        ],
        subTasks: [],
        assets: [],
        project: {
          _id: '67bdbe79357b0b90de229557',
          name: 'Mobile App Development',
          description: 'Build a cross-platform mobile app',
          createdBy: {_id: '67a9edafc1be67b40b7cf3dd', name: 'Harish Admin', email: 'skcbcastudent@gmail.com', role: 'Admin'},
          teamMembers: [
            '67ab3dc1d68d47ff5b59bc04',
            '67ab3da9d68d47ff5b59bbff',
            '67b42a4583c07b12eb620b55',
            '67a9f03a9b60506b2ca2e919',
            '67a9f0539b60506b2ca2e91e',
          ],
          startDate: '2025-03-01T00:00:00.000Z',
          tasks: [
            '67d13cc9dfdfb3927a12f10a',
            '67d2dd6cbb339918ddfe2046',
            '67d41bbcc41ac4fdd8c01836',
          ],
          endDate: '2025-09-01T00:00:00.000Z',
          status: 'In Progress',
          createdAt: '2025-02-25T12:58:33.155Z',
          updatedAt: '2025-03-22T08:51:17.866Z',
          __v: 29,
          updatedBy: '67a9edafc1be67b40b7cf3dd',
        },
        dueDate: '2025-03-27T00:00:00.000Z',
        logs: [],
        comments: [],
        createdAt: '2025-03-13T13:28:12.317Z',
        updatedAt: '2025-03-13T13:28:12.317Z',
        __v: 0,
      },
      {
        _id: '67d41bbcc41ac4fdd8c01836',
        title: 'Test',
        description: 'howd',
        assignedTo: [
          {
            _id: '67ab3da9d68d47ff5b59bbff',
            name: 'Test User',
            email: 'test1@Swomb.app',
            role: 'User',
            subRole: null,
          },
        ],
        priority: 'normal',
        stage: 'todo',
        activities: [
          {
            _id: '67d41bbbc41ac4fdd8c01834',
            type: 'Assigned',
            activity: 'Task assigned',
            by: {
              _id: '67a9edafc1be67b40b7cf3dd',
              name: 'Harish Admin',
              email: 'skcbcastudent@gmail.com',
              role: 'Admin',
              subRole: null,
            },
            date: '2025-03-14T12:06:19.993Z',
            __v: 0,
          },
        ],
        subTasks: [],
        assets: [],
        project: {
          _id: '67bdbe79357b0b90de229557',
          name: 'Mobile App Development',
          description: 'Build a cross-platform mobile app',
          createdBy: {_id: '67a9edafc1be67b40b7cf3dd', name: 'Harish Admin', email: 'skcbcastudent@gmail.com', role: 'Admin'},
          teamMembers: [
            '67ab3dc1d68d47ff5b59bc04',
            '67ab3da9d68d47ff5b59bbff',
            '67b42a4583c07b12eb620b55',
            '67a9f03a9b60506b2ca2e919',
            '67a9f0539b60506b2ca2e91e',
          ],
          startDate: '2025-03-01T00:00:00.000Z',
          tasks: [
            '67d13cc9dfdfb3927a12f10a',
            '67d2dd6cbb339918ddfe2046',
            '67d41bbcc41ac4fdd8c01836',
          ],
          endDate: '2025-09-01T00:00:00.000Z',
          status: 'In Progress',
          createdAt: '2025-02-25T12:58:33.155Z',
          updatedAt: '2025-03-22T08:51:17.866Z',
          __v: 29,
          updatedBy: '67a9edafc1be67b40b7cf3dd',
        },
        dueDate: '2025-03-28T00:00:00.000Z',
        logs: [],
        comments: [],
        createdAt: '2025-03-14T12:06:20.009Z',
        updatedAt: '2025-03-14T12:06:20.009Z',
        __v: 0,
      },
  ];
  