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
  status: string;
}
export interface createdByProject {
  _id: string;
  name: string;
  role: string;
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
  completedSubTasks: number;
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
    stage: 'todo',
    "activities": [
            {
                "_id": "67e63e123328c200708bc81c",
                "type": "Completed",
                "activity": "Design Homepage UI",
                "by": {
                    "_id": "67a9edafc1be67b40b7cf3dd",
                    "name": "Harish Admin",
                    "email": "skcbcastudent@gmail.com",
                    "role": "Admin",
                    "subRole": null
                },
                "date": "2025-03-28T06:13:38.891Z",
                "__v": 0
            },
            {
                "_id": "67e66955975ff7358e373add",
                "type": "Bug",
                "activity": "Design Homepage UI",
                "by": {
                    "_id": "67a9edafc1be67b40b7cf3dd",
                    "name": "Harish Admin",
                    "email": "skcbcastudent@gmail.com",
                    "role": "Admin",
                    "subRole": null
                },
                "date": "2025-03-28T09:18:13.427Z",
                "__v": 0
            },
            {
                "_id": "67e96231c1ec5f3bf38afcae",
                "type": "Completed",
                "activity": "Design Homepage UI",
                "by": {
                    "_id": "67a9edafc1be67b40b7cf3dd",
                    "name": "Harish Admin",
                    "email": "skcbcastudent@gmail.com",
                    "role": "Admin",
                    "subRole": null
                },
                "date": "2025-03-30T15:24:33.246Z",
                "__v": 0
            },
            {
                "_id": "67ed7adbe54b308eb25731b5",
                "type": "Bug",
                "activity": "Design Homepage UI",
                "by": {
                    "_id": "67a9edafc1be67b40b7cf3dd",
                    "name": "Harish Admin",
                    "email": "skcbcastudent@gmail.com",
                    "role": "Admin",
                    "subRole": null
                },
                "date": "2025-04-02T17:58:51.810Z",
                "__v": 0
            },
            {
                "_id": "680611ec0dc4aeabd45c9707",
                "type": "Started",
                "activity": "Design Homepage UI",
                "by": {
                    "_id": "67a9edafc1be67b40b7cf3dd",
                    "name": "Harish Admin",
                    "email": "skcbcastudent@gmail.com",
                    "role": "Admin",
                    "subRole": null
                },
                "date": "2025-04-21T09:37:48.148Z",
                "__v": 0
            },
            {
                "_id": "680611f40dc4aeabd45c9721",
                "type": "In Progress",
                "activity": "Test",
                "by": {
                    "_id": "67a9edafc1be67b40b7cf3dd",
                    "name": "Harish Admin",
                    "email": "skcbcastudent@gmail.com",
                    "role": "Admin",
                    "subRole": null
                },
                "date": "2025-04-21T09:37:56.630Z",
                "__v": 0
            },
            {
                "_id": "680612050dc4aeabd45c973b",
                "type": "Commented",
                "activity": "testing all ok",
                "by": {
                    "_id": "67a9edafc1be67b40b7cf3dd",
                    "name": "Harish Admin",
                    "email": "skcbcastudent@gmail.com",
                    "role": "Admin",
                    "subRole": null
                },
                "date": "2025-04-21T09:38:13.113Z",
                "__v": 0
            },
            {
                "_id": "6806120b0dc4aeabd45c9755",
                "type": "Assigned",
                "activity": "Design Homepage UI",
                "by": {
                    "_id": "67a9edafc1be67b40b7cf3dd",
                    "name": "Harish Admin",
                    "email": "skcbcastudent@gmail.com",
                    "role": "Admin",
                    "subRole": null
                },
                "date": "2025-04-21T09:38:19.235Z",
                "__v": 0
            }
        ],
    subTasks: [
      {
        title: 'Design Homepage UI',
        date: '2025-04-03T00:00:00.000Z',
        tag: 'Front-End',
        status: 'in progress',
        _id: '67e63b0baf16dcbdad451655',
      },
      {
        title: 'Test',
        date: '2025-04-03T00:00:00.000Z',
        tag: 'Test',
        status: 'todo',
        _id: '67ed7c9697b2e2794bd3efc0',
      },
      {
        title: 'Test',
        date: '2025-04-03T00:00:00.000Z',
        tag: 'Test',
        status: 'completed',
        _id: '67ed7c9697b2e2794bd3efc0',
      },
    ],
    assets: [],
    project: {
      _id: '67bdbe79357b0b90de229557',
      name: 'Mobile App Development',
      description: 'Build a cross-platform mobile app',
      createdBy: {
        _id: '67a9edafc1be67b40b7cf3dd',
        name: 'Harish Admin',
        email: 'skcbcastudent@gmail.com',
        role: 'Admin',
      },
      teamMembers: [
        '67ab3dc1d68d47ff5b59bc04',
        '67a9f0539b60506b2ca2e91e',
        '67a9f03a9b60506b2ca2e919',
        '67ab3da9d68d47ff5b59bbff',
      ],
      startDate: '2025-03-01T00:00:00.000Z',
      tasks: [
        '67d13cc9dfdfb3927a12f10a',
        '67d2dd6cbb339918ddfe2046',
        '67d41bbcc41ac4fdd8c01836',
        '67e52decf9816dd0896fa058',
      ],
      endDate: '2025-09-01T00:00:00.000Z',
      status: 'Not Started',
      createdAt: '2025-02-25T12:58:33.155Z',
      updatedAt: '2025-04-02T18:06:15.014Z',
      __v: 30,
      updatedBy: '67a9edafc1be67b40b7cf3dd',
    },
    dueDate: '2025-03-26T00:00:00.000Z',
    createdAt: '2025-03-12T07:50:33.815Z',
    updatedAt: '2025-04-02T18:06:14.950Z',
    __v: 0,
    logs: [],
    comments: [],
    completedSubTasks: 0,
  },
  {
    completedSubTasks: 0,
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
    activities: [],
    subTasks: [],
    assets: [],
    project: {
      _id: '67bdbe79357b0b90de229557',
      name: 'Mobile App Development',
      description: 'Build a cross-platform mobile app',
      createdBy: {
        _id: '67a9edafc1be67b40b7cf3dd',
        name: 'Harish Admin',
        email: 'skcbcastudent@gmail.com',
        role: 'Admin',
      },
      teamMembers: [
        '67ab3dc1d68d47ff5b59bc04',
        '67a9f0539b60506b2ca2e91e',
        '67a9f03a9b60506b2ca2e919',
        '67ab3da9d68d47ff5b59bbff',
      ],
      startDate: '2025-03-01T00:00:00.000Z',
      tasks: [
        '67d13cc9dfdfb3927a12f10a',
        '67d2dd6cbb339918ddfe2046',
        '67d41bbcc41ac4fdd8c01836',
        '67e52decf9816dd0896fa058',
      ],
      endDate: '2025-09-01T00:00:00.000Z',
      status: 'Not Started',
      createdAt: '2025-02-25T12:58:33.155Z',
      updatedAt: '2025-04-02T18:06:15.014Z',
      __v: 30,
      updatedBy: '67a9edafc1be67b40b7cf3dd',
    },
    dueDate: '2025-03-27T00:00:00.000Z',
    createdAt: '2025-03-13T13:28:12.317Z',
    updatedAt: '2025-03-28T04:32:51.188Z',
    __v: 0,
    logs: [],
    comments: []
  },
  {
    completedSubTasks: 0,
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
    activities: [],
    subTasks: [],
    assets: [],
    project: {
      _id: '67bdbe79357b0b90de229557',
      name: 'Mobile App Development',
      description: 'Build a cross-platform mobile app',
      createdBy: {
        _id: '67a9edafc1be67b40b7cf3dd',
        name: 'Harish Admin',
        email: 'skcbcastudent@gmail.com',
        role: 'Admin',
      },
      teamMembers: [
        '67ab3dc1d68d47ff5b59bc04',
        '67a9f0539b60506b2ca2e91e',
        '67a9f03a9b60506b2ca2e919',
        '67ab3da9d68d47ff5b59bbff',
      ],
      startDate: '2025-03-01T00:00:00.000Z',
      tasks: [
        '67d13cc9dfdfb3927a12f10a',
        '67d2dd6cbb339918ddfe2046',
        '67d41bbcc41ac4fdd8c01836',
        '67e52decf9816dd0896fa058',
      ],
      endDate: '2025-09-01T00:00:00.000Z',
      status: 'Not Started',
      createdAt: '2025-02-25T12:58:33.155Z',
      updatedAt: '2025-04-02T18:06:15.014Z',
      __v: 30,
      updatedBy: '67a9edafc1be67b40b7cf3dd',
    },
    dueDate: '2025-03-28T00:00:00.000Z',
    createdAt: '2025-03-14T12:06:20.009Z',
    updatedAt: '2025-03-14T12:06:20.009Z',
    __v: 0,
    logs: [],
    comments: []
  },
  {
    completedSubTasks: 0,
    _id: '67e52decf9816dd0896fa058',
    title: 'sdsd',
    description: 'dssds',
    assignedTo: [
      {
        _id: '67a9f0539b60506b2ca2e91e',
        name: 'Lalith',
        email: 'Lalith@swomb.app',
        role: 'Junior',
        subRole: 'designer',
      },
    ],
    priority: 'high',
    stage: 'todo',
    activities: [],
    subTasks: [],
    assets: [],
    project: {
      _id: '67bdbe79357b0b90de229557',
      name: 'Mobile App Development',
      description: 'Build a cross-platform mobile app',
      createdBy: {
        _id: '67a9edafc1be67b40b7cf3dd',
        name: 'Harish Admin',
        email: 'skcbcastudent@gmail.com',
        role: 'Admin',
      },
      teamMembers: [
        '67ab3dc1d68d47ff5b59bc04',
        '67a9f0539b60506b2ca2e91e',
        '67a9f03a9b60506b2ca2e919',
        '67ab3da9d68d47ff5b59bbff',
      ],
      startDate: '2025-03-01T00:00:00.000Z',
      tasks: [
        '67d13cc9dfdfb3927a12f10a',
        '67d2dd6cbb339918ddfe2046',
        '67d41bbcc41ac4fdd8c01836',
        '67e52decf9816dd0896fa058',
      ],
      endDate: '2025-09-01T00:00:00.000Z',
      status: 'Not Started',
      createdAt: '2025-02-25T12:58:33.155Z',
      updatedAt: '2025-04-02T18:06:15.014Z',
      __v: 30,
      updatedBy: '67a9edafc1be67b40b7cf3dd',
    },
    dueDate: '2025-03-28T00:00:00.000Z',
    createdAt: '2025-03-27T10:52:28.057Z',
    updatedAt: '2025-03-27T10:52:28.057Z',
    __v: 0,
    logs: [],
    comments: []
  },
];
