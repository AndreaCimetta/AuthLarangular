import {Priority, Role, Status} from './shared.model';


export enum DetailMode {
    Update = 'update',
    Create = 'create'
}

export enum Flag {
    true = '1',
    false = '0'
}

export enum PriorityLevel {
    None = '0',
    Appointment = '1',
    Urgent = '2'
}

export enum FromDayNumber {
    All = '7',
    StartWeek = '8',
    HalfWeek = '9',
    Weekend = '10',
    Monday = '1',
    Tuesday = '2',
    Wednesday = '3',
    Thursday = '4',
    Friday = '5',
    Saturday = '6',
    Sunday = '0',
}

export enum UserStatusType {
    Deleted = 0,
    Active = 1,
    Disabled = 2
}

export enum RoleType {
    Admin = 50,
    ProjectManager = 100,
    User = 200,
    ExternalUser = 300
}

export enum DataObjectStatus {
    Active = '1',
    Deleted = '0'
}


export enum Permissions {
    ChangeCompany = 'change-company',
    ManageUsers = 'manage-users',
    ManageSettings = 'manage-settings',
    ManageResources = 'manage-resources',
    ManageProjects = 'manage-projects',
    ManagerProjectPhase = 'manage-projects-phase',
    ManagePlanning = 'manage-planning',
    ShowAllOperators = 'show-all-operators',
    ModifyPlanning = 'modify-planning',
    ManageProjectActivity = 'manage-project-activity',
    SelectOperatorActivity= 'select-operator-activity'
}


export class AppConstants {

    public static HTTP_ERROR_UNAUTHORIZED = 401;
    public static HTTP_UNPROCESSABLE_ENTITY = 422;
    public static HTTP_INTERNAL_SERVER_ERROR = 500;

    public static DEFAULT_GRID_PAGE_SIZE = 10;

    public static PHASE_LIST_GRID_PAGE_SIZE = 50;

    public static DEFAULT_ROW_LIMIT  = 50;

    public static DEFAULT_MOCK_WS_DELAY = 10;

    public static DEFAULT_NUMBER_DECIMALS = 2;

    public static DEFAULT_CURRENCY_DECIMALS = 2;

    public static MIN_LENGTH_PWD = 5;

    public static ROLE_LIST: Role[] = [
        {
            code: RoleType.Admin,
            name: 'Admin'
        }, {
            code: RoleType.ProjectManager,
            name: 'Project Manager'
        }, {
            code: RoleType.User,
            name: 'User'
        }, {
            code: RoleType.ExternalUser,
            name: 'External User'
        },
    ];

    public static STATUS_LIST: Status[] = [
        {
            code: UserStatusType.Active,
            name: 'Active'
        }, {
            code: UserStatusType.Disabled,
            name: 'Disabled'
        }
    ];

    public static PRIORITY_LIST: Priority[] = [
        {
            code: PriorityLevel.None,
            name: 'Verde'
        },
        {
            code: PriorityLevel.Appointment,
            name: 'Giallo'
        },
        {
            code: PriorityLevel.Urgent,
            name: 'Rosso'
        }
    ];

    /** start day of week 0=Sunday,1=Monday,...**/
    public static PLANNING_WEEK_START_DAY = 1;


    public static API_GENERIC_ERROR_CODE = 0;
    public static API_CONCURRENT_UPDATE_CODE = 1;
    public static API_RECORD_NOT_FOUND_CODE = 2;
    public static API_VALIDATION_ERROR_CODE = 3;

    public static DEFAULT_WORKDAY_HOURS = 8;
}

