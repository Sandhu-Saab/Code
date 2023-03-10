PGDMP     9    
    	            {            test    15.1    15.1    t           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            u           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            v           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            w           1262    131529    test    DATABASE     w   CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1251';
    DROP DATABASE test;
                postgres    false            ?            1259    131843    assets_asset    TABLE     ?  CREATE TABLE public.assets_asset (
    id uuid NOT NULL,
    asset_number integer NOT NULL,
    serial_number character varying(100) NOT NULL,
    asset_name character varying(100) NOT NULL,
    category character varying(100) NOT NULL,
    ip_address character varying(100) NOT NULL,
    asset_dependencies character varying(100)[] NOT NULL,
    location character varying(100) NOT NULL,
    asset_resources character varying(100) NOT NULL,
    description character varying(100) NOT NULL,
    license_id_id uuid,
    status_id bigint,
    user_id_id uuid,
    course_id uuid,
    "assignedTo_id" uuid,
    "dateAdded" timestamp with time zone,
    "createdBy_id" uuid
);
     DROP TABLE public.assets_asset;
       public         heap    postgres    false            ?            1259    131911    assets_asset_status    TABLE     ?   CREATE TABLE public.assets_asset_status (
    id uuid NOT NULL,
    asset_status_id bigint NOT NULL,
    name character varying(100) NOT NULL
);
 '   DROP TABLE public.assets_asset_status;
       public         heap    postgres    false            ?            1259    131838    assets_license    TABLE     ?  CREATE TABLE public.assets_license (
    id uuid NOT NULL,
    vendor_name character varying(100) NOT NULL,
    product_name character varying(100) NOT NULL,
    current_version character varying(100) NOT NULL,
    license_type character varying(100) NOT NULL,
    vendor_support boolean NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    license_cost integer NOT NULL,
    license_name character varying(100) NOT NULL
);
 "   DROP TABLE public.assets_license;
       public         heap    postgres    false            ?            1259    131556 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         heap    postgres    false            ?            1259    131555    auth_group_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public          postgres    false    221            x           0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
          public          postgres    false    220            ?            1259    131565    auth_group_permissions    TABLE     ?   CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         heap    postgres    false            ?            1259    131564    auth_group_permissions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public          postgres    false    223            y           0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
          public          postgres    false    222            ?            1259    131549    auth_permission    TABLE     ?   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
 #   DROP TABLE public.auth_permission;
       public         heap    postgres    false            ?            1259    131548    auth_permission_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public          postgres    false    219            z           0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
          public          postgres    false    218            ?            1259    131977    changes_approvals    TABLE     @   CREATE TABLE public.changes_approvals (
    id uuid NOT NULL
);
 %   DROP TABLE public.changes_approvals;
       public         heap    postgres    false            ?            1259    131982    changes_backoutplan    TABLE     a   CREATE TABLE public.changes_backoutplan (
    id uuid NOT NULL,
    description text NOT NULL
);
 '   DROP TABLE public.changes_backoutplan;
       public         heap    postgres    false            ?            1259    131987    changes_businessjustification    TABLE     f  CREATE TABLE public.changes_businessjustification (
    id uuid NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    purpose character varying(100) NOT NULL,
    need character varying(100) NOT NULL,
    duration character varying(100) NOT NULL,
    accessibility character varying(100) NOT NULL
);
 1   DROP TABLE public.changes_businessjustification;
       public         heap    postgres    false            ?            1259    132009    changes_changerequest    TABLE     ?  CREATE TABLE public.changes_changerequest (
    id uuid NOT NULL,
    "requestType" character varying(100) NOT NULL,
    "requestDateTime" timestamp with time zone NOT NULL,
    "requestName" character varying(100) NOT NULL,
    "projectName" character varying(100) NOT NULL,
    "assignedTo_id" uuid,
    "requestOwnerSection_id" uuid,
    department character varying(100) NOT NULL,
    "requestedById_id" uuid,
    "requestContact" character varying(100) NOT NULL,
    description text NOT NULL,
    "isActive" boolean NOT NULL,
    approvals_id uuid,
    backout_plan_id uuid,
    business_justification_id uuid,
    communication_plan_id uuid,
    impact_id integer,
    install_plan_id uuid,
    "ownerId_id" uuid,
    priority_id integer,
    risk_assesment_id uuid,
    status integer NOT NULL,
    urgency_id integer,
    "requestNumber" integer NOT NULL,
    assets character varying(100)[]
);
 )   DROP TABLE public.changes_changerequest;
       public         heap    postgres    false            ?            1259    131992    changes_communicationplan    TABLE     g   CREATE TABLE public.changes_communicationplan (
    id uuid NOT NULL,
    description text NOT NULL
);
 -   DROP TABLE public.changes_communicationplan;
       public         heap    postgres    false            ?            1259    131997    changes_installplan    TABLE     a   CREATE TABLE public.changes_installplan (
    id uuid NOT NULL,
    description text NOT NULL
);
 '   DROP TABLE public.changes_installplan;
       public         heap    postgres    false            ?            1259    132002    changes_riskassesment    TABLE     p  CREATE TABLE public.changes_riskassesment (
    id uuid NOT NULL,
    doc_config character varying(100) NOT NULL,
    enviroment character varying(100) NOT NULL,
    redundancy character varying(100) NOT NULL,
    enviroment_maturity character varying(100) NOT NULL,
    time_to_implement character varying(100) NOT NULL,
    change_history character varying(100) NOT NULL,
    deployment_window character varying(100) NOT NULL,
    num_of_staff character varying(100) NOT NULL,
    testing character varying(100) NOT NULL,
    backout_plan character varying(100) NOT NULL,
    scheduling character varying(100) NOT NULL
);
 )   DROP TABLE public.changes_riskassesment;
       public         heap    postgres    false            ?            1259    132291    comments_comment    TABLE     ?   CREATE TABLE public.comments_comment (
    id uuid NOT NULL,
    "commentId" character varying(100) NOT NULL,
    comment character varying(200) NOT NULL,
    owner character varying(100) NOT NULL,
    date timestamp with time zone NOT NULL
);
 $   DROP TABLE public.comments_comment;
       public         heap    postgres    false            ?            1259    131680    django_admin_log    TABLE     ?  CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id uuid NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);
 $   DROP TABLE public.django_admin_log;
       public         heap    postgres    false            ?            1259    131679    django_admin_log_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.django_admin_log_id_seq;
       public          postgres    false    232            {           0    0    django_admin_log_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
          public          postgres    false    231            ?            1259    131540    django_content_type    TABLE     ?   CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
 '   DROP TABLE public.django_content_type;
       public         heap    postgres    false            ?            1259    131539    django_content_type_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.django_content_type_id_seq;
       public          postgres    false    217            |           0    0    django_content_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
          public          postgres    false    216            ?            1259    131531    django_migrations    TABLE     ?   CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
 %   DROP TABLE public.django_migrations;
       public         heap    postgres    false            ?            1259    131530    django_migrations_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.django_migrations_id_seq;
       public          postgres    false    215            }           0    0    django_migrations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
          public          postgres    false    214            ?            1259    132550    django_session    TABLE     ?   CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
 "   DROP TABLE public.django_session;
       public         heap    postgres    false            ?            1259    131763    incidents_incident    TABLE     ?  CREATE TABLE public.incidents_incident (
    id uuid NOT NULL,
    "reportDateTime" timestamp with time zone NOT NULL,
    "multipleAffectedUser" boolean NOT NULL,
    "affectedUserSize" integer NOT NULL,
    impact_id integer,
    urgency_id integer,
    priority_id integer,
    "ticketOwnerId_id" uuid,
    "ticketDateTime" timestamp with time zone NOT NULL,
    "assignedTechId_id" uuid,
    subject character varying(100) NOT NULL,
    details text NOT NULL,
    "ticketOwnerSection_id" uuid,
    "ticketOwnerRole_id" integer,
    "userId_id" uuid,
    status_id integer,
    "ticketNumber" integer NOT NULL,
    "ticketType_id" uuid,
    "isAssigned" boolean NOT NULL,
    security_group_id uuid,
    "problemsRelated_id" uuid
);
 &   DROP TABLE public.incidents_incident;
       public         heap    postgres    false            ?            1259    132420    incidents_tickettype    TABLE     ?   CREATE TABLE public.incidents_tickettype (
    id uuid NOT NULL,
    category character varying(100) NOT NULL,
    type character varying(100) NOT NULL
);
 (   DROP TABLE public.incidents_tickettype;
       public         heap    postgres    false            ?            1259    131742    priority_priority    TABLE     ?   CREATE TABLE public.priority_priority (
    id uuid NOT NULL,
    priority_id integer NOT NULL,
    priority_name character varying(100) NOT NULL
);
 %   DROP TABLE public.priority_priority;
       public         heap    postgres    false            ?            1259    131749    priority_status    TABLE     ?   CREATE TABLE public.priority_status (
    id uuid NOT NULL,
    status_id integer NOT NULL,
    status_name character varying(100) NOT NULL
);
 #   DROP TABLE public.priority_status;
       public         heap    postgres    false            ?            1259    131756    problems_problem    TABLE     ?  CREATE TABLE public.problems_problem (
    id uuid NOT NULL,
    "reportDateTime" timestamp with time zone NOT NULL,
    "multipleAffectedUser" boolean NOT NULL,
    "affectedUserSize" integer NOT NULL,
    impact_id integer,
    urgency_id integer,
    priority_id integer,
    "ticketOwnerId_id" uuid,
    "ticketDateTime" timestamp with time zone NOT NULL,
    "assignedTechId_id" uuid,
    summary character varying(100) NOT NULL,
    details text NOT NULL,
    "ticketOwnerSection_id" uuid,
    "userId_id" uuid,
    status_id integer,
    "ticketNumber" integer NOT NULL,
    "isAssigned" boolean NOT NULL,
    security_group_id uuid
);
 $   DROP TABLE public.problems_problem;
       public         heap    postgres    false            ?            1259    131597    users_course    TABLE     ?   CREATE TABLE public.users_course (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    section character varying(100) NOT NULL,
    term character varying(100) NOT NULL,
    date timestamp with time zone NOT NULL
);
     DROP TABLE public.users_course;
       public         heap    postgres    false            ?            1259    131602 
   users_role    TABLE     ?   CREATE TABLE public.users_role (
    id uuid NOT NULL,
    "roleId" integer NOT NULL,
    name character varying(100) NOT NULL
);
    DROP TABLE public.users_role;
       public         heap    postgres    false            ?            1259    131701    users_securitygroup    TABLE     {   CREATE TABLE public.users_securitygroup (
    "securityGroupId" uuid NOT NULL,
    name character varying(100) NOT NULL
);
 '   DROP TABLE public.users_securitygroup;
       public         heap    postgres    false            ?            1259    131611 
   users_user    TABLE     (  CREATE TABLE public.users_user (
    password character varying(100) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    id uuid NOT NULL,
    username character varying(200) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    approved boolean NOT NULL,
    course_id_id uuid,
    role_id integer
);
    DROP TABLE public.users_user;
       public         heap    postgres    false            ?            1259    131623    users_user_groups    TABLE     |   CREATE TABLE public.users_user_groups (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    group_id integer NOT NULL
);
 %   DROP TABLE public.users_user_groups;
       public         heap    postgres    false            ?            1259    131622    users_user_groups_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.users_user_groups_id_seq;
       public          postgres    false    228            ~           0    0    users_user_groups_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.users_user_groups_id_seq OWNED BY public.users_user_groups.id;
          public          postgres    false    227            ?            1259    131709    users_user_security_group    TABLE     ?   CREATE TABLE public.users_user_security_group (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    securitygroup_id uuid NOT NULL
);
 -   DROP TABLE public.users_user_security_group;
       public         heap    postgres    false            ?            1259    131708     users_user_security_group_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_security_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.users_user_security_group_id_seq;
       public          postgres    false    235                       0    0     users_user_security_group_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.users_user_security_group_id_seq OWNED BY public.users_user_security_group.id;
          public          postgres    false    234            ?            1259    131630    users_user_user_permissions    TABLE     ?   CREATE TABLE public.users_user_user_permissions (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    permission_id integer NOT NULL
);
 /   DROP TABLE public.users_user_user_permissions;
       public         heap    postgres    false            ?            1259    131629 "   users_user_user_permissions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.users_user_user_permissions_id_seq;
       public          postgres    false    230            ?           0    0 "   users_user_user_permissions_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.users_user_user_permissions_id_seq OWNED BY public.users_user_user_permissions.id;
          public          postgres    false    229            ?           2604    131559    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            ?           2604    131568    auth_group_permissions id    DEFAULT     ?   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            ?           2604    131552    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            ?           2604    131683    django_admin_log id    DEFAULT     z   ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
 B   ALTER TABLE public.django_admin_log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    232    232            ?           2604    131543    django_content_type id    DEFAULT     ?   ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
 E   ALTER TABLE public.django_content_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            ?           2604    131534    django_migrations id    DEFAULT     |   ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
 C   ALTER TABLE public.django_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            ?           2604    131626    users_user_groups id    DEFAULT     |   ALTER TABLE ONLY public.users_user_groups ALTER COLUMN id SET DEFAULT nextval('public.users_user_groups_id_seq'::regclass);
 C   ALTER TABLE public.users_user_groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            ?           2604    131712    users_user_security_group id    DEFAULT     ?   ALTER TABLE ONLY public.users_user_security_group ALTER COLUMN id SET DEFAULT nextval('public.users_user_security_group_id_seq'::regclass);
 K   ALTER TABLE public.users_user_security_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    234    235            ?           2604    131633    users_user_user_permissions id    DEFAULT     ?   ALTER TABLE ONLY public.users_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.users_user_user_permissions_id_seq'::regclass);
 M   ALTER TABLE public.users_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229    230            f          0    131843    assets_asset 
   TABLE DATA             COPY public.assets_asset (id, asset_number, serial_number, asset_name, category, ip_address, asset_dependencies, location, asset_resources, description, license_id_id, status_id, user_id_id, course_id, "assignedTo_id", "dateAdded", "createdBy_id") FROM stdin;
    public          postgres    false    241   ??      g          0    131911    assets_asset_status 
   TABLE DATA           H   COPY public.assets_asset_status (id, asset_status_id, name) FROM stdin;
    public          postgres    false    242   ??      e          0    131838    assets_license 
   TABLE DATA           ?   COPY public.assets_license (id, vendor_name, product_name, current_version, license_type, vendor_support, start_date, end_date, license_cost, license_name) FROM stdin;
    public          postgres    false    240   ??      R          0    131556 
   auth_group 
   TABLE DATA           .   COPY public.auth_group (id, name) FROM stdin;
    public          postgres    false    221   ?      T          0    131565    auth_group_permissions 
   TABLE DATA           M   COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public          postgres    false    223   ??      P          0    131549    auth_permission 
   TABLE DATA           N   COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
    public          postgres    false    219   ??      h          0    131977    changes_approvals 
   TABLE DATA           /   COPY public.changes_approvals (id) FROM stdin;
    public          postgres    false    243   ??      i          0    131982    changes_backoutplan 
   TABLE DATA           >   COPY public.changes_backoutplan (id, description) FROM stdin;
    public          postgres    false    244   ̝      j          0    131987    changes_businessjustification 
   TABLE DATA           y   COPY public.changes_businessjustification (id, start_date, end_date, purpose, need, duration, accessibility) FROM stdin;
    public          postgres    false    245   ??      n          0    132009    changes_changerequest 
   TABLE DATA           ?  COPY public.changes_changerequest (id, "requestType", "requestDateTime", "requestName", "projectName", "assignedTo_id", "requestOwnerSection_id", department, "requestedById_id", "requestContact", description, "isActive", approvals_id, backout_plan_id, business_justification_id, communication_plan_id, impact_id, install_plan_id, "ownerId_id", priority_id, risk_assesment_id, status, urgency_id, "requestNumber", assets) FROM stdin;
    public          postgres    false    249   ?      k          0    131992    changes_communicationplan 
   TABLE DATA           D   COPY public.changes_communicationplan (id, description) FROM stdin;
    public          postgres    false    246   #?      l          0    131997    changes_installplan 
   TABLE DATA           >   COPY public.changes_installplan (id, description) FROM stdin;
    public          postgres    false    247   @?      m          0    132002    changes_riskassesment 
   TABLE DATA           ?   COPY public.changes_riskassesment (id, doc_config, enviroment, redundancy, enviroment_maturity, time_to_implement, change_history, deployment_window, num_of_staff, testing, backout_plan, scheduling) FROM stdin;
    public          postgres    false    248   ]?      o          0    132291    comments_comment 
   TABLE DATA           Q   COPY public.comments_comment (id, "commentId", comment, owner, date) FROM stdin;
    public          postgres    false    250   z?      ]          0    131680    django_admin_log 
   TABLE DATA           ?   COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
    public          postgres    false    232   ??      N          0    131540    django_content_type 
   TABLE DATA           C   COPY public.django_content_type (id, app_label, model) FROM stdin;
    public          postgres    false    217   u?      L          0    131531    django_migrations 
   TABLE DATA           C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public          postgres    false    215   ??      q          0    132550    django_session 
   TABLE DATA           P   COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
    public          postgres    false    252   	?      d          0    131763    incidents_incident 
   TABLE DATA           ~  COPY public.incidents_incident (id, "reportDateTime", "multipleAffectedUser", "affectedUserSize", impact_id, urgency_id, priority_id, "ticketOwnerId_id", "ticketDateTime", "assignedTechId_id", subject, details, "ticketOwnerSection_id", "ticketOwnerRole_id", "userId_id", status_id, "ticketNumber", "ticketType_id", "isAssigned", security_group_id, "problemsRelated_id") FROM stdin;
    public          postgres    false    239   +?      p          0    132420    incidents_tickettype 
   TABLE DATA           B   COPY public.incidents_tickettype (id, category, type) FROM stdin;
    public          postgres    false    251   ۩      a          0    131742    priority_priority 
   TABLE DATA           K   COPY public.priority_priority (id, priority_id, priority_name) FROM stdin;
    public          postgres    false    236   (?      b          0    131749    priority_status 
   TABLE DATA           E   COPY public.priority_status (id, status_id, status_name) FROM stdin;
    public          postgres    false    237   p?      c          0    131756    problems_problem 
   TABLE DATA           ?  COPY public.problems_problem (id, "reportDateTime", "multipleAffectedUser", "affectedUserSize", impact_id, urgency_id, priority_id, "ticketOwnerId_id", "ticketDateTime", "assignedTechId_id", summary, details, "ticketOwnerSection_id", "userId_id", status_id, "ticketNumber", "isAssigned", security_group_id) FROM stdin;
    public          postgres    false    238   ??      U          0    131597    users_course 
   TABLE DATA           E   COPY public.users_course (id, name, section, term, date) FROM stdin;
    public          postgres    false    224   Q?      V          0    131602 
   users_role 
   TABLE DATA           8   COPY public.users_role (id, "roleId", name) FROM stdin;
    public          postgres    false    225   #?      ^          0    131701    users_securitygroup 
   TABLE DATA           F   COPY public.users_securitygroup ("securityGroupId", name) FROM stdin;
    public          postgres    false    233   ?      W          0    131611 
   users_user 
   TABLE DATA           ?   COPY public.users_user (password, last_login, is_superuser, is_staff, is_active, date_joined, id, username, first_name, last_name, email, approved, course_id_id, role_id) FROM stdin;
    public          postgres    false    226   ߬      Y          0    131623    users_user_groups 
   TABLE DATA           B   COPY public.users_user_groups (id, user_id, group_id) FROM stdin;
    public          postgres    false    228   `?      `          0    131709    users_user_security_group 
   TABLE DATA           R   COPY public.users_user_security_group (id, user_id, securitygroup_id) FROM stdin;
    public          postgres    false    235   }?      [          0    131630    users_user_user_permissions 
   TABLE DATA           Q   COPY public.users_user_user_permissions (id, user_id, permission_id) FROM stdin;
    public          postgres    false    230   ??      ?           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
          public          postgres    false    220            ?           0    0    auth_group_permissions_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);
          public          postgres    false    222            ?           0    0    auth_permission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_permission_id_seq', 100, true);
          public          postgres    false    218            ?           0    0    django_admin_log_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.django_admin_log_id_seq', 2, true);
          public          postgres    false    231            ?           0    0    django_content_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.django_content_type_id_seq', 25, true);
          public          postgres    false    216            ?           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 96, true);
          public          postgres    false    214            ?           0    0    users_user_groups_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.users_user_groups_id_seq', 1, false);
          public          postgres    false    227            ?           0    0     users_user_security_group_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.users_user_security_group_id_seq', 1, false);
          public          postgres    false    234            ?           0    0 "   users_user_user_permissions_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.users_user_user_permissions_id_seq', 1, false);
          public          postgres    false    229            ^           2606    131849    assets_asset assets_asset_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.assets_asset
    ADD CONSTRAINT assets_asset_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.assets_asset DROP CONSTRAINT assets_asset_pkey;
       public            postgres    false    241            b           2606    131917 :   assets_asset_status assets_assetstatus_asset_status_id_key 
   CONSTRAINT     ?   ALTER TABLE ONLY public.assets_asset_status
    ADD CONSTRAINT assets_assetstatus_asset_status_id_key UNIQUE (asset_status_id);
 d   ALTER TABLE ONLY public.assets_asset_status DROP CONSTRAINT assets_assetstatus_asset_status_id_key;
       public            postgres    false    242            d           2606    131915 +   assets_asset_status assets_assetstatus_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.assets_asset_status
    ADD CONSTRAINT assets_assetstatus_pkey PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.assets_asset_status DROP CONSTRAINT assets_assetstatus_pkey;
       public            postgres    false    242            X           2606    131842 "   assets_license assets_license_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.assets_license
    ADD CONSTRAINT assets_license_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.assets_license DROP CONSTRAINT assets_license_pkey;
       public            postgres    false    240            ?           2606    131595    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public            postgres    false    221            ?           2606    131581 R   auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
 |   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
       public            postgres    false    223    223                        2606    131570 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public            postgres    false    223            ?           2606    131561    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public            postgres    false    221            ?           2606    131572 F   auth_permission auth_permission_content_type_id_codename_01ab375a_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);
 p   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
       public            postgres    false    219    219            ?           2606    131554 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public            postgres    false    219            f           2606    131981 (   changes_approvals changes_approvals_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.changes_approvals
    ADD CONSTRAINT changes_approvals_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.changes_approvals DROP CONSTRAINT changes_approvals_pkey;
       public            postgres    false    243            h           2606    131986 ,   changes_backoutplan changes_backoutplan_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.changes_backoutplan
    ADD CONSTRAINT changes_backoutplan_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.changes_backoutplan DROP CONSTRAINT changes_backoutplan_pkey;
       public            postgres    false    244            j           2606    131991 @   changes_businessjustification changes_businessjustification_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.changes_businessjustification
    ADD CONSTRAINT changes_businessjustification_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.changes_businessjustification DROP CONSTRAINT changes_businessjustification_pkey;
       public            postgres    false    245            z           2606    132015 0   changes_changerequest changes_changerequest_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changerequest_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changerequest_pkey;
       public            postgres    false    249            l           2606    131996 8   changes_communicationplan changes_communicationplan_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.changes_communicationplan
    ADD CONSTRAINT changes_communicationplan_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.changes_communicationplan DROP CONSTRAINT changes_communicationplan_pkey;
       public            postgres    false    246            n           2606    132001 ,   changes_installplan changes_installplan_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.changes_installplan
    ADD CONSTRAINT changes_installplan_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.changes_installplan DROP CONSTRAINT changes_installplan_pkey;
       public            postgres    false    247            p           2606    132008 0   changes_riskassesment changes_riskassesment_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.changes_riskassesment
    ADD CONSTRAINT changes_riskassesment_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.changes_riskassesment DROP CONSTRAINT changes_riskassesment_pkey;
       public            postgres    false    248            ?           2606    132295 &   comments_comment comments_comment_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.comments_comment
    ADD CONSTRAINT comments_comment_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.comments_comment DROP CONSTRAINT comments_comment_pkey;
       public            postgres    false    250            "           2606    131688 &   django_admin_log django_admin_log_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
       public            postgres    false    232            ?           2606    131547 E   django_content_type django_content_type_app_label_model_76bd3d3b_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
 o   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
       public            postgres    false    217    217            ?           2606    131545 ,   django_content_type django_content_type_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
       public            postgres    false    217            ?           2606    131538 (   django_migrations django_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
       public            postgres    false    215            ?           2606    132556 "   django_session django_session_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
 L   ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
       public            postgres    false    252            J           2606    131769 *   incidents_incident incidents_incident_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT incidents_incident_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT incidents_incident_pkey;
       public            postgres    false    239            P           2606    132505 @   incidents_incident incidents_incident_ticketNumber_c1d863d7_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT "incidents_incident_ticketNumber_c1d863d7_uniq" UNIQUE ("ticketNumber");
 l   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT "incidents_incident_ticketNumber_c1d863d7_uniq";
       public            postgres    false    239            ?           2606    132424 .   incidents_tickettype incidents_tickettype_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.incidents_tickettype
    ADD CONSTRAINT incidents_tickettype_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.incidents_tickettype DROP CONSTRAINT incidents_tickettype_pkey;
       public            postgres    false    251            0           2606    131746 (   priority_priority priority_priority_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.priority_priority
    ADD CONSTRAINT priority_priority_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.priority_priority DROP CONSTRAINT priority_priority_pkey;
       public            postgres    false    236            2           2606    131748 3   priority_priority priority_priority_priority_id_key 
   CONSTRAINT     u   ALTER TABLE ONLY public.priority_priority
    ADD CONSTRAINT priority_priority_priority_id_key UNIQUE (priority_id);
 ]   ALTER TABLE ONLY public.priority_priority DROP CONSTRAINT priority_priority_priority_id_key;
       public            postgres    false    236            4           2606    131753 $   priority_status priority_status_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.priority_status
    ADD CONSTRAINT priority_status_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.priority_status DROP CONSTRAINT priority_status_pkey;
       public            postgres    false    237            6           2606    131755 -   priority_status priority_status_status_id_key 
   CONSTRAINT     m   ALTER TABLE ONLY public.priority_status
    ADD CONSTRAINT priority_status_status_id_key UNIQUE (status_id);
 W   ALTER TABLE ONLY public.priority_status DROP CONSTRAINT priority_status_status_id_key;
       public            postgres    false    237            9           2606    132507 9   priority_status priority_status_status_name_8c4f0dbc_uniq 
   CONSTRAINT     {   ALTER TABLE ONLY public.priority_status
    ADD CONSTRAINT priority_status_status_name_8c4f0dbc_uniq UNIQUE (status_name);
 c   ALTER TABLE ONLY public.priority_status DROP CONSTRAINT priority_status_status_name_8c4f0dbc_uniq;
       public            postgres    false    237            =           2606    131762 &   problems_problem problems_problem_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT problems_problem_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT problems_problem_pkey;
       public            postgres    false    238            B           2606    132549 <   problems_problem problems_problem_ticketNumber_a62b59dc_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT "problems_problem_ticketNumber_a62b59dc_uniq" UNIQUE ("ticketNumber");
 h   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT "problems_problem_ticketNumber_a62b59dc_uniq";
       public            postgres    false    238                       2606    131601    users_course users_course_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.users_course
    ADD CONSTRAINT users_course_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.users_course DROP CONSTRAINT users_course_pkey;
       public            postgres    false    224                       2606    131610    users_role users_role_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users_role
    ADD CONSTRAINT users_role_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.users_role DROP CONSTRAINT users_role_name_key;
       public            postgres    false    225                       2606    131606    users_role users_role_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.users_role
    ADD CONSTRAINT users_role_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.users_role DROP CONSTRAINT users_role_pkey;
       public            postgres    false    225            	           2606    131608     users_role users_role_roleId_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.users_role
    ADD CONSTRAINT "users_role_roleId_key" UNIQUE ("roleId");
 L   ALTER TABLE ONLY public.users_role DROP CONSTRAINT "users_role_roleId_key";
       public            postgres    false    225            &           2606    131707 0   users_securitygroup users_securitygroup_name_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.users_securitygroup
    ADD CONSTRAINT users_securitygroup_name_key UNIQUE (name);
 Z   ALTER TABLE ONLY public.users_securitygroup DROP CONSTRAINT users_securitygroup_name_key;
       public            postgres    false    233            (           2606    131705 ,   users_securitygroup users_securitygroup_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.users_securitygroup
    ADD CONSTRAINT users_securitygroup_pkey PRIMARY KEY ("securityGroupId");
 V   ALTER TABLE ONLY public.users_securitygroup DROP CONSTRAINT users_securitygroup_pkey;
       public            postgres    false    233                       2606    131621    users_user users_user_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.users_user DROP CONSTRAINT users_user_email_key;
       public            postgres    false    226                       2606    131628 (   users_user_groups users_user_groups_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.users_user_groups
    ADD CONSTRAINT users_user_groups_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.users_user_groups DROP CONSTRAINT users_user_groups_pkey;
       public            postgres    false    228                       2606    131652 B   users_user_groups users_user_groups_user_id_group_id_b88eab82_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_groups
    ADD CONSTRAINT users_user_groups_user_id_group_id_b88eab82_uniq UNIQUE (user_id, group_id);
 l   ALTER TABLE ONLY public.users_user_groups DROP CONSTRAINT users_user_groups_user_id_group_id_b88eab82_uniq;
       public            postgres    false    228    228                       2606    131617    users_user users_user_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.users_user DROP CONSTRAINT users_user_pkey;
       public            postgres    false    226            *           2606    131717 Y   users_user_security_group users_user_security_grou_user_id_securitygroup_id_958b93b4_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_security_group
    ADD CONSTRAINT users_user_security_grou_user_id_securitygroup_id_958b93b4_uniq UNIQUE (user_id, securitygroup_id);
 ?   ALTER TABLE ONLY public.users_user_security_group DROP CONSTRAINT users_user_security_grou_user_id_securitygroup_id_958b93b4_uniq;
       public            postgres    false    235    235            ,           2606    131714 8   users_user_security_group users_user_security_group_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.users_user_security_group
    ADD CONSTRAINT users_user_security_group_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.users_user_security_group DROP CONSTRAINT users_user_security_group_pkey;
       public            postgres    false    235                       2606    131635 <   users_user_user_permissions users_user_user_permissions_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_permissions_pkey PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.users_user_user_permissions DROP CONSTRAINT users_user_user_permissions_pkey;
       public            postgres    false    230                       2606    131666 [   users_user_user_permissions users_user_user_permissions_user_id_permission_id_43338c45_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_permissions_user_id_permission_id_43338c45_uniq UNIQUE (user_id, permission_id);
 ?   ALTER TABLE ONLY public.users_user_user_permissions DROP CONSTRAINT users_user_user_permissions_user_id_permission_id_43338c45_uniq;
       public            postgres    false    230    230                       2606    131619 "   users_user users_user_username_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_username_key UNIQUE (username);
 L   ALTER TABLE ONLY public.users_user DROP CONSTRAINT users_user_username_key;
       public            postgres    false    226            Y           1259    131889 #   assets_asset_assignedTo_id_6a330723    INDEX     i   CREATE INDEX "assets_asset_assignedTo_id_6a330723" ON public.assets_asset USING btree ("assignedTo_id");
 9   DROP INDEX public."assets_asset_assignedTo_id_6a330723";
       public            postgres    false    241            Z           1259    131878    assets_asset_course_id_ce77c54d    INDEX     ]   CREATE INDEX assets_asset_course_id_ce77c54d ON public.assets_asset USING btree (course_id);
 3   DROP INDEX public.assets_asset_course_id_ce77c54d;
       public            postgres    false    241            [           1259    131951 "   assets_asset_createdBy_id_ddd91740    INDEX     g   CREATE INDEX "assets_asset_createdBy_id_ddd91740" ON public.assets_asset USING btree ("createdBy_id");
 8   DROP INDEX public."assets_asset_createdBy_id_ddd91740";
       public            postgres    false    241            \           1259    131865 #   assets_asset_license_id_id_3542d910    INDEX     e   CREATE INDEX assets_asset_license_id_id_3542d910 ON public.assets_asset USING btree (license_id_id);
 7   DROP INDEX public.assets_asset_license_id_id_3542d910;
       public            postgres    false    241            _           1259    131918    assets_asset_status_id_dbcec5aa    INDEX     ]   CREATE INDEX assets_asset_status_id_dbcec5aa ON public.assets_asset USING btree (status_id);
 3   DROP INDEX public.assets_asset_status_id_dbcec5aa;
       public            postgres    false    241            `           1259    131867     assets_asset_user_id_id_86549dad    INDEX     _   CREATE INDEX assets_asset_user_id_id_86549dad ON public.assets_asset USING btree (user_id_id);
 4   DROP INDEX public.assets_asset_user_id_id_86549dad;
       public            postgres    false    241            ?           1259    131596    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public            postgres    false    221            ?           1259    131592 (   auth_group_permissions_group_id_b120cbf9    INDEX     o   CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
 <   DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
       public            postgres    false    223            ?           1259    131593 -   auth_group_permissions_permission_id_84c5c92e    INDEX     y   CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
 A   DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
       public            postgres    false    223            ?           1259    131578 (   auth_permission_content_type_id_2f476e4b    INDEX     o   CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
 <   DROP INDEX public.auth_permission_content_type_id_2f476e4b;
       public            postgres    false    219            q           1259    132076 +   changes_changerequest_approvals_id_21a8255c    INDEX     u   CREATE INDEX changes_changerequest_approvals_id_21a8255c ON public.changes_changerequest USING btree (approvals_id);
 ?   DROP INDEX public.changes_changerequest_approvals_id_21a8255c;
       public            postgres    false    249            r           1259    132126 ,   changes_changerequest_assignedTo_id_05a9ebe8    INDEX     {   CREATE INDEX "changes_changerequest_assignedTo_id_05a9ebe8" ON public.changes_changerequest USING btree ("assignedTo_id");
 B   DROP INDEX public."changes_changerequest_assignedTo_id_05a9ebe8";
       public            postgres    false    249            s           1259    132078 .   changes_changerequest_backout_plan_id_20519c2d    INDEX     {   CREATE INDEX changes_changerequest_backout_plan_id_20519c2d ON public.changes_changerequest USING btree (backout_plan_id);
 B   DROP INDEX public.changes_changerequest_backout_plan_id_20519c2d;
       public            postgres    false    249            t           1259    132079 8   changes_changerequest_business_justification_id_17e20e70    INDEX     ?   CREATE INDEX changes_changerequest_business_justification_id_17e20e70 ON public.changes_changerequest USING btree (business_justification_id);
 L   DROP INDEX public.changes_changerequest_business_justification_id_17e20e70;
       public            postgres    false    249            u           1259    132080 4   changes_changerequest_communication_plan_id_6ff1e4ce    INDEX     ?   CREATE INDEX changes_changerequest_communication_plan_id_6ff1e4ce ON public.changes_changerequest USING btree (communication_plan_id);
 H   DROP INDEX public.changes_changerequest_communication_plan_id_6ff1e4ce;
       public            postgres    false    249            v           1259    132081 (   changes_changerequest_impact_id_806d385a    INDEX     o   CREATE INDEX changes_changerequest_impact_id_806d385a ON public.changes_changerequest USING btree (impact_id);
 <   DROP INDEX public.changes_changerequest_impact_id_806d385a;
       public            postgres    false    249            w           1259    132082 .   changes_changerequest_install_plan_id_cb75c92f    INDEX     {   CREATE INDEX changes_changerequest_install_plan_id_cb75c92f ON public.changes_changerequest USING btree (install_plan_id);
 B   DROP INDEX public.changes_changerequest_install_plan_id_cb75c92f;
       public            postgres    false    249            x           1259    132083 )   changes_changerequest_ownerId_id_1c6270ac    INDEX     u   CREATE INDEX "changes_changerequest_ownerId_id_1c6270ac" ON public.changes_changerequest USING btree ("ownerId_id");
 ?   DROP INDEX public."changes_changerequest_ownerId_id_1c6270ac";
       public            postgres    false    249            {           1259    132084 *   changes_changerequest_priority_id_a411be70    INDEX     s   CREATE INDEX changes_changerequest_priority_id_a411be70 ON public.changes_changerequest USING btree (priority_id);
 >   DROP INDEX public.changes_changerequest_priority_id_a411be70;
       public            postgres    false    249            |           1259    132151 5   changes_changerequest_requestOwnerSection_id_f63ce7f2    INDEX     ?   CREATE INDEX "changes_changerequest_requestOwnerSection_id_f63ce7f2" ON public.changes_changerequest USING btree ("requestOwnerSection_id");
 K   DROP INDEX public."changes_changerequest_requestOwnerSection_id_f63ce7f2";
       public            postgres    false    249            }           1259    132177 /   changes_changerequest_requestedById_id_b0cecba5    INDEX     ?   CREATE INDEX "changes_changerequest_requestedById_id_b0cecba5" ON public.changes_changerequest USING btree ("requestedById_id");
 E   DROP INDEX public."changes_changerequest_requestedById_id_b0cecba5";
       public            postgres    false    249            ~           1259    132085 0   changes_changerequest_risk_assesment_id_985a9a03    INDEX        CREATE INDEX changes_changerequest_risk_assesment_id_985a9a03 ON public.changes_changerequest USING btree (risk_assesment_id);
 D   DROP INDEX public.changes_changerequest_risk_assesment_id_985a9a03;
       public            postgres    false    249                       1259    132087 )   changes_changerequest_urgency_id_66fc4176    INDEX     q   CREATE INDEX changes_changerequest_urgency_id_66fc4176 ON public.changes_changerequest USING btree (urgency_id);
 =   DROP INDEX public.changes_changerequest_urgency_id_66fc4176;
       public            postgres    false    249                        1259    131699 )   django_admin_log_content_type_id_c4bce8eb    INDEX     q   CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
 =   DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
       public            postgres    false    232            #           1259    131700 !   django_admin_log_user_id_c564eba6    INDEX     a   CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
 5   DROP INDEX public.django_admin_log_user_id_c564eba6;
       public            postgres    false    232            ?           1259    132558 #   django_session_expire_date_a5c62663    INDEX     e   CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
 7   DROP INDEX public.django_session_expire_date_a5c62663;
       public            postgres    false    252            ?           1259    132557 (   django_session_session_key_c0390e0f_like    INDEX     ~   CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
 <   DROP INDEX public.django_session_session_key_c0390e0f_like;
       public            postgres    false    252            G           1259    132475 -   incidents_incident_assignedTechId_id_eb82e401    INDEX     }   CREATE INDEX "incidents_incident_assignedTechId_id_eb82e401" ON public.incidents_incident USING btree ("assignedTechId_id");
 C   DROP INDEX public."incidents_incident_assignedTechId_id_eb82e401";
       public            postgres    false    239            H           1259    131959 %   incidents_incident_impact_id_a2495049    INDEX     i   CREATE INDEX incidents_incident_impact_id_a2495049 ON public.incidents_incident USING btree (impact_id);
 9   DROP INDEX public.incidents_incident_impact_id_a2495049;
       public            postgres    false    239            K           1259    131965 '   incidents_incident_priority_id_3ac2ca6c    INDEX     m   CREATE INDEX incidents_incident_priority_id_3ac2ca6c ON public.incidents_incident USING btree (priority_id);
 ;   DROP INDEX public.incidents_incident_priority_id_3ac2ca6c;
       public            postgres    false    239            L           1259    132448 .   incidents_incident_problemsRelated_id_b3516537    INDEX        CREATE INDEX "incidents_incident_problemsRelated_id_b3516537" ON public.incidents_incident USING btree ("problemsRelated_id");
 D   DROP INDEX public."incidents_incident_problemsRelated_id_b3516537";
       public            postgres    false    239            M           1259    132442 -   incidents_incident_security_group_id_3c00fd23    INDEX     y   CREATE INDEX incidents_incident_security_group_id_3c00fd23 ON public.incidents_incident USING btree (security_group_id);
 A   DROP INDEX public.incidents_incident_security_group_id_3c00fd23;
       public            postgres    false    239            N           1259    131831 %   incidents_incident_status_id_311d19ae    INDEX     i   CREATE INDEX incidents_incident_status_id_311d19ae ON public.incidents_incident USING btree (status_id);
 9   DROP INDEX public.incidents_incident_status_id_311d19ae;
       public            postgres    false    239            Q           1259    132498 ,   incidents_incident_ticketOwnerId_id_ab7e7073    INDEX     {   CREATE INDEX "incidents_incident_ticketOwnerId_id_ab7e7073" ON public.incidents_incident USING btree ("ticketOwnerId_id");
 B   DROP INDEX public."incidents_incident_ticketOwnerId_id_ab7e7073";
       public            postgres    false    239            R           1259    132396 .   incidents_incident_ticketOwnerRole_id_444f92d6    INDEX        CREATE INDEX "incidents_incident_ticketOwnerRole_id_444f92d6" ON public.incidents_incident USING btree ("ticketOwnerRole_id");
 D   DROP INDEX public."incidents_incident_ticketOwnerRole_id_444f92d6";
       public            postgres    false    239            S           1259    132414 1   incidents_incident_ticketOwnerSection_id_cb3ffe38    INDEX     ?   CREATE INDEX "incidents_incident_ticketOwnerSection_id_cb3ffe38" ON public.incidents_incident USING btree ("ticketOwnerSection_id");
 G   DROP INDEX public."incidents_incident_ticketOwnerSection_id_cb3ffe38";
       public            postgres    false    239            T           1259    132430 *   incidents_incident_ticketTypes_id_299f1166    INDEX     v   CREATE INDEX "incidents_incident_ticketTypes_id_299f1166" ON public.incidents_incident USING btree ("ticketType_id");
 @   DROP INDEX public."incidents_incident_ticketTypes_id_299f1166";
       public            postgres    false    239            U           1259    131971 &   incidents_incident_urgency_id_34a613ea    INDEX     k   CREATE INDEX incidents_incident_urgency_id_34a613ea ON public.incidents_incident USING btree (urgency_id);
 :   DROP INDEX public.incidents_incident_urgency_id_34a613ea;
       public            postgres    false    239            V           1259    131796 %   incidents_incident_userId_id_0be1798e    INDEX     m   CREATE INDEX "incidents_incident_userId_id_0be1798e" ON public.incidents_incident USING btree ("userId_id");
 ;   DROP INDEX public."incidents_incident_userId_id_0be1798e";
       public            postgres    false    239            7           1259    132508 )   priority_status_status_name_8c4f0dbc_like    INDEX     ?   CREATE INDEX priority_status_status_name_8c4f0dbc_like ON public.priority_status USING btree (status_name varchar_pattern_ops);
 =   DROP INDEX public.priority_status_status_name_8c4f0dbc_like;
       public            postgres    false    237            :           1259    132522 +   problems_problem_assignedTechId_id_5692e8c8    INDEX     y   CREATE INDEX "problems_problem_assignedTechId_id_5692e8c8" ON public.problems_problem USING btree ("assignedTechId_id");
 A   DROP INDEX public."problems_problem_assignedTechId_id_5692e8c8";
       public            postgres    false    238            ;           1259    132307 #   problems_problem_impact_id_02a5c982    INDEX     e   CREATE INDEX problems_problem_impact_id_02a5c982 ON public.problems_problem USING btree (impact_id);
 7   DROP INDEX public.problems_problem_impact_id_02a5c982;
       public            postgres    false    238            >           1259    132313 %   problems_problem_priority_id_62e0b40a    INDEX     i   CREATE INDEX problems_problem_priority_id_62e0b40a ON public.problems_problem USING btree (priority_id);
 9   DROP INDEX public.problems_problem_priority_id_62e0b40a;
       public            postgres    false    238            ?           1259    132375 +   problems_problem_security_group_id_3c6e13f0    INDEX     u   CREATE INDEX problems_problem_security_group_id_3c6e13f0 ON public.problems_problem USING btree (security_group_id);
 ?   DROP INDEX public.problems_problem_security_group_id_3c6e13f0;
       public            postgres    false    238            @           1259    132328 #   problems_problem_status_id_11c0a1e8    INDEX     e   CREATE INDEX problems_problem_status_id_11c0a1e8 ON public.problems_problem USING btree (status_id);
 7   DROP INDEX public.problems_problem_status_id_11c0a1e8;
       public            postgres    false    238            C           1259    132542 *   problems_problem_ticketOwnerId_id_1ff1dba3    INDEX     w   CREATE INDEX "problems_problem_ticketOwnerId_id_1ff1dba3" ON public.problems_problem USING btree ("ticketOwnerId_id");
 @   DROP INDEX public."problems_problem_ticketOwnerId_id_1ff1dba3";
       public            postgres    false    238            D           1259    132363 /   problems_problem_ticketOwnerSection_id_8b9f0b59    INDEX     ?   CREATE INDEX "problems_problem_ticketOwnerSection_id_8b9f0b59" ON public.problems_problem USING btree ("ticketOwnerSection_id");
 E   DROP INDEX public."problems_problem_ticketOwnerSection_id_8b9f0b59";
       public            postgres    false    238            E           1259    132334 $   problems_problem_urgency_id_057e3b09    INDEX     g   CREATE INDEX problems_problem_urgency_id_057e3b09 ON public.problems_problem USING btree (urgency_id);
 8   DROP INDEX public.problems_problem_urgency_id_057e3b09;
       public            postgres    false    238            F           1259    132305 #   problems_problem_userId_id_0f6ad9d6    INDEX     i   CREATE INDEX "problems_problem_userId_id_0f6ad9d6" ON public.problems_problem USING btree ("userId_id");
 9   DROP INDEX public."problems_problem_userId_id_0f6ad9d6";
       public            postgres    false    238                       1259    131636    users_role_name_86bbd537_like    INDEX     h   CREATE INDEX users_role_name_86bbd537_like ON public.users_role USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.users_role_name_86bbd537_like;
       public            postgres    false    225            $           1259    131715 &   users_securitygroup_name_9b3f65fd_like    INDEX     z   CREATE INDEX users_securitygroup_name_9b3f65fd_like ON public.users_securitygroup USING btree (name varchar_pattern_ops);
 :   DROP INDEX public.users_securitygroup_name_9b3f65fd_like;
       public            postgres    false    233            
           1259    131649     users_user_course_id_id_34494762    INDEX     _   CREATE INDEX users_user_course_id_id_34494762 ON public.users_user USING btree (course_id_id);
 4   DROP INDEX public.users_user_course_id_id_34494762;
       public            postgres    false    226                       1259    131648    users_user_email_243f6e77_like    INDEX     j   CREATE INDEX users_user_email_243f6e77_like ON public.users_user USING btree (email varchar_pattern_ops);
 2   DROP INDEX public.users_user_email_243f6e77_like;
       public            postgres    false    226                       1259    131664 #   users_user_groups_group_id_9afc8d0e    INDEX     e   CREATE INDEX users_user_groups_group_id_9afc8d0e ON public.users_user_groups USING btree (group_id);
 7   DROP INDEX public.users_user_groups_group_id_9afc8d0e;
       public            postgres    false    228                       1259    131663 "   users_user_groups_user_id_5f6f5a90    INDEX     c   CREATE INDEX users_user_groups_user_id_5f6f5a90 ON public.users_user_groups USING btree (user_id);
 6   DROP INDEX public.users_user_groups_user_id_5f6f5a90;
       public            postgres    false    228                       1259    131650    users_user_role_id_854f2687    INDEX     U   CREATE INDEX users_user_role_id_854f2687 ON public.users_user USING btree (role_id);
 /   DROP INDEX public.users_user_role_id_854f2687;
       public            postgres    false    226            -           1259    131729 3   users_user_security_group_securitygroup_id_805ed8d7    INDEX     ?   CREATE INDEX users_user_security_group_securitygroup_id_805ed8d7 ON public.users_user_security_group USING btree (securitygroup_id);
 G   DROP INDEX public.users_user_security_group_securitygroup_id_805ed8d7;
       public            postgres    false    235            .           1259    131728 *   users_user_security_group_user_id_d11374d6    INDEX     s   CREATE INDEX users_user_security_group_user_id_d11374d6 ON public.users_user_security_group USING btree (user_id);
 >   DROP INDEX public.users_user_security_group_user_id_d11374d6;
       public            postgres    false    235                       1259    131678 2   users_user_user_permissions_permission_id_0b93982e    INDEX     ?   CREATE INDEX users_user_user_permissions_permission_id_0b93982e ON public.users_user_user_permissions USING btree (permission_id);
 F   DROP INDEX public.users_user_user_permissions_permission_id_0b93982e;
       public            postgres    false    230                       1259    131677 ,   users_user_user_permissions_user_id_20aca447    INDEX     w   CREATE INDEX users_user_user_permissions_user_id_20aca447 ON public.users_user_user_permissions USING btree (user_id);
 @   DROP INDEX public.users_user_user_permissions_user_id_20aca447;
       public            postgres    false    230                       1259    131647 !   users_user_username_06e46fe6_like    INDEX     p   CREATE INDEX users_user_username_06e46fe6_like ON public.users_user USING btree (username varchar_pattern_ops);
 5   DROP INDEX public.users_user_username_06e46fe6_like;
       public            postgres    false    226            ?           2606    131890 A   assets_asset assets_asset_assignedTo_id_6a330723_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.assets_asset
    ADD CONSTRAINT "assets_asset_assignedTo_id_6a330723_fk_users_user_id" FOREIGN KEY ("assignedTo_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 m   ALTER TABLE ONLY public.assets_asset DROP CONSTRAINT "assets_asset_assignedTo_id_6a330723_fk_users_user_id";
       public          postgres    false    226    241    3343            ?           2606    131873 ?   assets_asset assets_asset_course_id_ce77c54d_fk_users_course_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.assets_asset
    ADD CONSTRAINT assets_asset_course_id_ce77c54d_fk_users_course_id FOREIGN KEY (course_id) REFERENCES public.users_course(id) DEFERRABLE INITIALLY DEFERRED;
 i   ALTER TABLE ONLY public.assets_asset DROP CONSTRAINT assets_asset_course_id_ce77c54d_fk_users_course_id;
       public          postgres    false    224    241    3330            ?           2606    131946 @   assets_asset assets_asset_createdBy_id_ddd91740_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.assets_asset
    ADD CONSTRAINT "assets_asset_createdBy_id_ddd91740_fk_users_user_id" FOREIGN KEY ("createdBy_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.assets_asset DROP CONSTRAINT "assets_asset_createdBy_id_ddd91740_fk_users_user_id";
       public          postgres    false    226    241    3343            ?           2606    131850 E   assets_asset assets_asset_license_id_id_3542d910_fk_assets_license_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.assets_asset
    ADD CONSTRAINT assets_asset_license_id_id_3542d910_fk_assets_license_id FOREIGN KEY (license_id_id) REFERENCES public.assets_license(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.assets_asset DROP CONSTRAINT assets_asset_license_id_id_3542d910_fk_assets_license_id;
       public          postgres    false    3416    241    240            ?           2606    131930 9   assets_asset assets_asset_status_id_dbcec5aa_fk_assets_as    FK CONSTRAINT     ?   ALTER TABLE ONLY public.assets_asset
    ADD CONSTRAINT assets_asset_status_id_dbcec5aa_fk_assets_as FOREIGN KEY (status_id) REFERENCES public.assets_asset_status(asset_status_id) DEFERRABLE INITIALLY DEFERRED;
 c   ALTER TABLE ONLY public.assets_asset DROP CONSTRAINT assets_asset_status_id_dbcec5aa_fk_assets_as;
       public          postgres    false    242    241    3426            ?           2606    131860 >   assets_asset assets_asset_user_id_id_86549dad_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.assets_asset
    ADD CONSTRAINT assets_asset_user_id_id_86549dad_fk_users_user_id FOREIGN KEY (user_id_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 h   ALTER TABLE ONLY public.assets_asset DROP CONSTRAINT assets_asset_user_id_id_86549dad_fk_users_user_id;
       public          postgres    false    226    3343    241            ?           2606    131587 O   auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
       public          postgres    false    3317    219    223            ?           2606    131582 P   auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
       public          postgres    false    221    223    3322            ?           2606    131573 E   auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
       public          postgres    false    219    217    3312            ?           2606    132016 M   changes_changerequest changes_changereques_approvals_id_21a8255c_fk_changes_a    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_approvals_id_21a8255c_fk_changes_a FOREIGN KEY (approvals_id) REFERENCES public.changes_approvals(id) DEFERRABLE INITIALLY DEFERRED;
 w   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_approvals_id_21a8255c_fk_changes_a;
       public          postgres    false    243    3430    249            ?           2606    132026 P   changes_changerequest changes_changereques_backout_plan_id_20519c2d_fk_changes_b    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_backout_plan_id_20519c2d_fk_changes_b FOREIGN KEY (backout_plan_id) REFERENCES public.changes_backoutplan(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_backout_plan_id_20519c2d_fk_changes_b;
       public          postgres    false    3432    249    244            ?           2606    132031 U   changes_changerequest changes_changereques_business_justificati_17e20e70_fk_changes_b    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_business_justificati_17e20e70_fk_changes_b FOREIGN KEY (business_justification_id) REFERENCES public.changes_businessjustification(id) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_business_justificati_17e20e70_fk_changes_b;
       public          postgres    false    3434    245    249            ?           2606    132036 U   changes_changerequest changes_changereques_communication_plan_i_6ff1e4ce_fk_changes_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_communication_plan_i_6ff1e4ce_fk_changes_c FOREIGN KEY (communication_plan_id) REFERENCES public.changes_communicationplan(id) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_communication_plan_i_6ff1e4ce_fk_changes_c;
       public          postgres    false    249    3436    246            ?           2606    132088 J   changes_changerequest changes_changereques_impact_id_806d385a_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_impact_id_806d385a_fk_priority_ FOREIGN KEY (impact_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 t   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_impact_id_806d385a_fk_priority_;
       public          postgres    false    3378    236    249            ?           2606    132046 P   changes_changerequest changes_changereques_install_plan_id_cb75c92f_fk_changes_i    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_install_plan_id_cb75c92f_fk_changes_i FOREIGN KEY (install_plan_id) REFERENCES public.changes_installplan(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_install_plan_id_cb75c92f_fk_changes_i;
       public          postgres    false    3438    249    247            ?           2606    132093 L   changes_changerequest changes_changereques_priority_id_a411be70_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_priority_id_a411be70_fk_priority_ FOREIGN KEY (priority_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 v   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_priority_id_a411be70_fk_priority_;
       public          postgres    false    236    3378    249            ?           2606    132152 U   changes_changerequest changes_changereques_requestOwnerSection__f63ce7f2_fk_users_cou    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT "changes_changereques_requestOwnerSection__f63ce7f2_fk_users_cou" FOREIGN KEY ("requestOwnerSection_id") REFERENCES public.users_course(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT "changes_changereques_requestOwnerSection__f63ce7f2_fk_users_cou";
       public          postgres    false    224    3330    249            ?           2606    132178 Q   changes_changerequest changes_changereques_requestedById_id_b0cecba5_fk_users_use    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT "changes_changereques_requestedById_id_b0cecba5_fk_users_use" FOREIGN KEY ("requestedById_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT "changes_changereques_requestedById_id_b0cecba5_fk_users_use";
       public          postgres    false    226    3343    249            ?           2606    132061 R   changes_changerequest changes_changereques_risk_assesment_id_985a9a03_fk_changes_r    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_risk_assesment_id_985a9a03_fk_changes_r FOREIGN KEY (risk_assesment_id) REFERENCES public.changes_riskassesment(id) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_risk_assesment_id_985a9a03_fk_changes_r;
       public          postgres    false    3440    248    249            ?           2606    132103 K   changes_changerequest changes_changereques_urgency_id_66fc4176_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT changes_changereques_urgency_id_66fc4176_fk_priority_ FOREIGN KEY (urgency_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT changes_changereques_urgency_id_66fc4176_fk_priority_;
       public          postgres    false    3378    249    236            ?           2606    132127 S   changes_changerequest changes_changerequest_assignedTo_id_05a9ebe8_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT "changes_changerequest_assignedTo_id_05a9ebe8_fk_users_user_id" FOREIGN KEY ("assignedTo_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT "changes_changerequest_assignedTo_id_05a9ebe8_fk_users_user_id";
       public          postgres    false    3343    226    249            ?           2606    132051 P   changes_changerequest changes_changerequest_ownerId_id_1c6270ac_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.changes_changerequest
    ADD CONSTRAINT "changes_changerequest_ownerId_id_1c6270ac_fk_users_user_id" FOREIGN KEY ("ownerId_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public.changes_changerequest DROP CONSTRAINT "changes_changerequest_ownerId_id_1c6270ac_fk_users_user_id";
       public          postgres    false    249    3343    226            ?           2606    131689 G   django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co    FK CONSTRAINT     ?   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
       public          postgres    false    217    3312    232            ?           2606    131694 C   django_admin_log django_admin_log_user_id_c564eba6_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_user_id FOREIGN KEY (user_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 m   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_user_id;
       public          postgres    false    232    226    3343            ?           2606    132476 Q   incidents_incident incidents_incident_assignedTechId_id_eb82e401_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT "incidents_incident_assignedTechId_id_eb82e401_fk_users_user_id" FOREIGN KEY ("assignedTechId_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT "incidents_incident_assignedTechId_id_eb82e401_fk_users_user_id";
       public          postgres    false    239    3343    226            ?           2606    132376 E   incidents_incident incidents_incident_impact_id_a2495049_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT incidents_incident_impact_id_a2495049_fk_priority_ FOREIGN KEY (impact_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT incidents_incident_impact_id_a2495049_fk_priority_;
       public          postgres    false    3378    239    236            ?           2606    132381 G   incidents_incident incidents_incident_priority_id_3ac2ca6c_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT incidents_incident_priority_id_3ac2ca6c_fk_priority_ FOREIGN KEY (priority_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT incidents_incident_priority_id_3ac2ca6c_fk_priority_;
       public          postgres    false    3378    236    239            ?           2606    132454 N   incidents_incident incidents_incident_problemsRelated_id_b3516537_fk_problems_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT "incidents_incident_problemsRelated_id_b3516537_fk_problems_" FOREIGN KEY ("problemsRelated_id") REFERENCES public.problems_problem(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT "incidents_incident_problemsRelated_id_b3516537_fk_problems_";
       public          postgres    false    239    3389    238            ?           2606    132437 M   incidents_incident incidents_incident_security_group_id_3c00fd23_fk_users_sec    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT incidents_incident_security_group_id_3c00fd23_fk_users_sec FOREIGN KEY (security_group_id) REFERENCES public.users_securitygroup("securityGroupId") DEFERRABLE INITIALLY DEFERRED;
 w   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT incidents_incident_security_group_id_3c00fd23_fk_users_sec;
       public          postgres    false    239    233    3368            ?           2606    132386 E   incidents_incident incidents_incident_status_id_311d19ae_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT incidents_incident_status_id_311d19ae_fk_priority_ FOREIGN KEY (status_id) REFERENCES public.priority_status(status_id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT incidents_incident_status_id_311d19ae_fk_priority_;
       public          postgres    false    3382    237    239            ?           2606    132499 P   incidents_incident incidents_incident_ticketOwnerId_id_ab7e7073_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT "incidents_incident_ticketOwnerId_id_ab7e7073_fk_users_user_id" FOREIGN KEY ("ticketOwnerId_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT "incidents_incident_ticketOwnerId_id_ab7e7073_fk_users_user_id";
       public          postgres    false    239    3343    226            ?           2606    132397 N   incidents_incident incidents_incident_ticketOwnerRole_id_444f92d6_fk_users_rol    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT "incidents_incident_ticketOwnerRole_id_444f92d6_fk_users_rol" FOREIGN KEY ("ticketOwnerRole_id") REFERENCES public.users_role("roleId") DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT "incidents_incident_ticketOwnerRole_id_444f92d6_fk_users_rol";
       public          postgres    false    239    3337    225            ?           2606    132415 P   incidents_incident incidents_incident_ticketOwnerSection_i_cb3ffe38_fk_users_cou    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT "incidents_incident_ticketOwnerSection_i_cb3ffe38_fk_users_cou" FOREIGN KEY ("ticketOwnerSection_id") REFERENCES public.users_course(id) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT "incidents_incident_ticketOwnerSection_i_cb3ffe38_fk_users_cou";
       public          postgres    false    3330    224    239            ?           2606    132431 I   incidents_incident incidents_incident_ticketType_id_fb5092c9_fk_incidents    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT "incidents_incident_ticketType_id_fb5092c9_fk_incidents" FOREIGN KEY ("ticketType_id") REFERENCES public.incidents_tickettype(id) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT "incidents_incident_ticketType_id_fb5092c9_fk_incidents";
       public          postgres    false    3459    239    251            ?           2606    132391 F   incidents_incident incidents_incident_urgency_id_34a613ea_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT incidents_incident_urgency_id_34a613ea_fk_priority_ FOREIGN KEY (urgency_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT incidents_incident_urgency_id_34a613ea_fk_priority_;
       public          postgres    false    239    3378    236            ?           2606    131819 I   incidents_incident incidents_incident_userId_id_0be1798e_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.incidents_incident
    ADD CONSTRAINT "incidents_incident_userId_id_0be1798e_fk_users_user_id" FOREIGN KEY ("userId_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public.incidents_incident DROP CONSTRAINT "incidents_incident_userId_id_0be1798e_fk_users_user_id";
       public          postgres    false    239    226    3343            ?           2606    132523 M   problems_problem problems_problem_assignedTechId_id_5692e8c8_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT "problems_problem_assignedTechId_id_5692e8c8_fk_users_user_id" FOREIGN KEY ("assignedTechId_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT "problems_problem_assignedTechId_id_5692e8c8_fk_users_user_id";
       public          postgres    false    238    3343    226            ?           2606    132308 A   problems_problem problems_problem_impact_id_02a5c982_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT problems_problem_impact_id_02a5c982_fk_priority_ FOREIGN KEY (impact_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 k   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT problems_problem_impact_id_02a5c982_fk_priority_;
       public          postgres    false    238    236    3378            ?           2606    132314 C   problems_problem problems_problem_priority_id_62e0b40a_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT problems_problem_priority_id_62e0b40a_fk_priority_ FOREIGN KEY (priority_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 m   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT problems_problem_priority_id_62e0b40a_fk_priority_;
       public          postgres    false    3378    236    238            ?           2606    132370 I   problems_problem problems_problem_security_group_id_3c6e13f0_fk_users_sec    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT problems_problem_security_group_id_3c6e13f0_fk_users_sec FOREIGN KEY (security_group_id) REFERENCES public.users_securitygroup("securityGroupId") DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT problems_problem_security_group_id_3c6e13f0_fk_users_sec;
       public          postgres    false    3368    238    233            ?           2606    132329 A   problems_problem problems_problem_status_id_11c0a1e8_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT problems_problem_status_id_11c0a1e8_fk_priority_ FOREIGN KEY (status_id) REFERENCES public.priority_status(status_id) DEFERRABLE INITIALLY DEFERRED;
 k   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT problems_problem_status_id_11c0a1e8_fk_priority_;
       public          postgres    false    238    237    3382            ?           2606    132543 L   problems_problem problems_problem_ticketOwnerId_id_1ff1dba3_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT "problems_problem_ticketOwnerId_id_1ff1dba3_fk_users_user_id" FOREIGN KEY ("ticketOwnerId_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 x   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT "problems_problem_ticketOwnerId_id_1ff1dba3_fk_users_user_id";
       public          postgres    false    238    226    3343            ?           2606    132364 L   problems_problem problems_problem_ticketOwnerSection_i_8b9f0b59_fk_users_cou    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT "problems_problem_ticketOwnerSection_i_8b9f0b59_fk_users_cou" FOREIGN KEY ("ticketOwnerSection_id") REFERENCES public.users_course(id) DEFERRABLE INITIALLY DEFERRED;
 x   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT "problems_problem_ticketOwnerSection_i_8b9f0b59_fk_users_cou";
       public          postgres    false    3330    238    224            ?           2606    132335 B   problems_problem problems_problem_urgency_id_057e3b09_fk_priority_    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT problems_problem_urgency_id_057e3b09_fk_priority_ FOREIGN KEY (urgency_id) REFERENCES public.priority_priority(priority_id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT problems_problem_urgency_id_057e3b09_fk_priority_;
       public          postgres    false    238    236    3378            ?           2606    132300 E   problems_problem problems_problem_userId_id_0f6ad9d6_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT "problems_problem_userId_id_0f6ad9d6_fk_users_user_id" FOREIGN KEY ("userId_id") REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.problems_problem DROP CONSTRAINT "problems_problem_userId_id_0f6ad9d6_fk_users_user_id";
       public          postgres    false    226    3343    238            ?           2606    131637 >   users_user users_user_course_id_id_34494762_fk_users_course_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_course_id_id_34494762_fk_users_course_id FOREIGN KEY (course_id_id) REFERENCES public.users_course(id) DEFERRABLE INITIALLY DEFERRED;
 h   ALTER TABLE ONLY public.users_user DROP CONSTRAINT users_user_course_id_id_34494762_fk_users_course_id;
       public          postgres    false    226    3330    224            ?           2606    131658 F   users_user_groups users_user_groups_group_id_9afc8d0e_fk_auth_group_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_groups
    ADD CONSTRAINT users_user_groups_group_id_9afc8d0e_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public.users_user_groups DROP CONSTRAINT users_user_groups_group_id_9afc8d0e_fk_auth_group_id;
       public          postgres    false    221    3322    228            ?           2606    131653 E   users_user_groups users_user_groups_user_id_5f6f5a90_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_groups
    ADD CONSTRAINT users_user_groups_user_id_5f6f5a90_fk_users_user_id FOREIGN KEY (user_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.users_user_groups DROP CONSTRAINT users_user_groups_user_id_5f6f5a90_fk_users_user_id;
       public          postgres    false    226    228    3343            ?           2606    131642 ;   users_user users_user_role_id_854f2687_fk_users_role_roleId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT "users_user_role_id_854f2687_fk_users_role_roleId" FOREIGN KEY (role_id) REFERENCES public.users_role("roleId") DEFERRABLE INITIALLY DEFERRED;
 g   ALTER TABLE ONLY public.users_user DROP CONSTRAINT "users_user_role_id_854f2687_fk_users_role_roleId";
       public          postgres    false    226    3337    225            ?           2606    131723 U   users_user_security_group users_user_security__securitygroup_id_805ed8d7_fk_users_sec    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_security_group
    ADD CONSTRAINT users_user_security__securitygroup_id_805ed8d7_fk_users_sec FOREIGN KEY (securitygroup_id) REFERENCES public.users_securitygroup("securityGroupId") DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.users_user_security_group DROP CONSTRAINT users_user_security__securitygroup_id_805ed8d7_fk_users_sec;
       public          postgres    false    233    3368    235            ?           2606    131718 U   users_user_security_group users_user_security_group_user_id_d11374d6_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_security_group
    ADD CONSTRAINT users_user_security_group_user_id_d11374d6_fk_users_user_id FOREIGN KEY (user_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.users_user_security_group DROP CONSTRAINT users_user_security_group_user_id_d11374d6_fk_users_user_id;
       public          postgres    false    226    3343    235            ?           2606    131672 T   users_user_user_permissions users_user_user_perm_permission_id_0b93982e_fk_auth_perm    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_perm_permission_id_0b93982e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public.users_user_user_permissions DROP CONSTRAINT users_user_user_perm_permission_id_0b93982e_fk_auth_perm;
       public          postgres    false    3317    230    219            ?           2606    131667 Y   users_user_user_permissions users_user_user_permissions_user_id_20aca447_fk_users_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_permissions_user_id_20aca447_fk_users_user_id FOREIGN KEY (user_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public.users_user_user_permissions DROP CONSTRAINT users_user_user_permissions_user_id_20aca447_fk_users_user_id;
       public          postgres    false    3343    226    230            f   ?  x?œAj\1?מS?zX?-?s?.z?n,?&?$y???޽??"-??
?ha~?|?mg?^@?vH#9T???R8??????㸻<???=???<B???ǧ?[???_m?????V???)?T????4?9S$'\[B??yV?i$?k??????ژZ	?w??Z?T??1MpZ??*?>?)??? ?.?9?3ʖ"E%?zH?4MdFq??Rk?"?H:c1?K(??}???shcАA`E>?s-?<mx?h%?J./??u???"??V`n?N?<?/??9???&???0?і???q??3C????8?`?NAo??}|y??L???O??s+#??A?? ?_=E?^?KS?????Ψf·9?:u?ƾ2?A?v??4?XTB?M߰|y??[?W???c??44f#H?jG???(s%?+ϣ?Y?U?כZa??Z?*???*_2?3խ?Rc:???v:??jX?      g   :   x?K?4O6N???MK22?5I3N?M??Hҵ0J2I??H46J4?4?,JML??????? W??      e   ?  x??WIr?H<˯??
??o?K?sj_4???')?=?v??<(?&? ??1x?N?? ?9?&g䅥'W%?tyy?????????O||??????埋c???<3??W?E4?? )???{h?k??)??T8
u?YC3?)u{{}k???????ܒ?????o??OZ?????+??Jy?B)?>B???.???*/?菼??? ?????Ӵ??????|
????b_?=?,ie??? ?!3?aʴ>E??l?A??3?+f?w?/????˵?V?m??ڶ??A????}:?? ?lo?????9bR?JÅ-?1)Ւ(v+?%???? "?գ???2???8???B?4@?L5T?1?i????D?(??ɟ??C?U?5??D);?I]A??&I???=??? ̭?/z??=?>|?J?!DʥG??Bij#?K??o?}?;m???({??99??y4JQ'i,?R????J?q????5?/"??9G??w?{?ى?^?΄??BՍ?!??????~???
?%$۳? ??/-(I??j?( ?0?9-p??ht???l`???yԜ?~?ruOUU(?i3M???i??>o?=??|??I?????:??'?8g???u?|?????''?r???T?^?????Qb>???????l?z?n??0?(?????j??n?????UÒv?w?6??u?˵
???_??%&?2.mQ??ooj????? ??x?????f?/?=>ױ	?u'?????v?a??????nO???y?eX-???F????pP????~???j	K?P?d?+???F?jP???!??1:Z?F??q??m?K?C?w?}???e?L=5??@?R???P??!N?'?WU????X?%?ǋ???(??
????e???t?N??糡#?O?a?;??:'??C'P?/??:????{D(?????K?x?=6&??ʶpN? v??1&{?a q?h?? 3?Ѱ?OI??﯂?????;(|.@x?t??fXC??%?c???BI????pډ~?aQ;8?
>ߍ?C??;??? ?a>ki??ғ???qO9b?
?????!??"??gm?]c	fl?Qݶ?,??2?G?A?;
??"<^'?|????n?|?@??J%\8L??L?o??c۰?G?K???s
?m???<==???A      R      x?????? ? ?      T      x?????? ? ?      P   ?  x?u??r?@??٧?t̯???Fg2?Д??O;y??JZ?,ΝW??6:Ғ&???T??????????dɶ~??~?2?4?????B
?|k?vA?B
?۵? ?
?A٣???<w???^?\e???{???e????D ?F?݂??i\I???.=[q?ϺI?&AX#?J????<(h?a????|>ڤ?B8?G\ZX9̪?/???g??W*4??^`/A????V^0?\z?b?a??Y???<???JSȫ
H???./?y??uN.^?(?2?D??D? o??3?Ib?GZ??wM;?mr%??e`e?Â?Gf???W??gr?st??p?۾=8????{R.Ϣ#? =?[g??[?%?#?~???
n`.rB????????Q?N??m=?D?+?_Q? AQ7T$T???l??r?Ъ??~ۦ޿?vT?l?"???`D?*?}??i?4]?Y?n?????(J????'??7@?;D?:$]m??S?o@?V?:?SB????+??y?? ?? ?"??9o{	??U?M??k????]	un1֡$T?%Y????-??)?վt?G?!??D!?J(??e????p?j??!??^??#??ڷ?$???KW?/$7????ۆp?#????0?????????<?$?*0??[?_ +MVYc ??*?.x???q]N????f?????+b??B?$N`ɐ`\?^7????u???Rp???K??k?e?.?4?d6???佞????C?]??????G?????O??:??]?4??Fc?Y???Qr4͞%?Q??Wr?R???S?9?{T?sF????Ͱ?"??Iȱ?bB??&???qn??n0u??????????ޢ!????2?1	??1I?<&?FqL???	?1D^?gm獧 E9?n?5?Ra????$??I?{S??0!7s???A?<8h?nN?????١dBVvz(??C(??E_?`?~???V@?J?~mJ?PD?g?? ?5???s??vK?w      h      x?????? ? ?      i      x?????? ? ?      j      x?????? ? ?      n      x?????? ? ?      k      x?????? ? ?      l      x?????? ? ?      m      x?????? ? ?      o      x?????? ? ?      ]   ?   x????o?0????s?gg?d??1?p_?P?a????g?2E??????)???"8[9?7?????v؀%ű?DI?B/?D	S?D??;??<-
??f?^.y4}u32??X?????l??s6/?y???0?t?	o?Te?m/?|???{j^㣡뛶???549P?(@?l?@?E?????????r??a???^???x??~???_?fl?      N     x?U??n? ????L?$=?ˤ?R/?B?b???!??~>??H?#??Џ????G????9=E?83y?B??s?N?R)MS@~?,ko.B3c?????Sf?nԒA??e Oe?8???	?r???K?Tk?-Q?F?&GJӲ?l9C?:iS ?7????/?"D?8?&@^?yjח??P௶??û6??)X?@???\??'s?o2:?n??^0?+?5Q??ܓ??Q?.X?8?A\Q?1??_?$ڲ=?م]?????? ???      L   h  x???ے?8??=O?/?·<?VQV<l0x'??_!??d˘???????V??V7???l?y??????U۷s[w??????B?+_?8"?%S_?z#???e?a??C??R???QQ)?????6?^+-?\,X? U??f??f?????[??Կ???g???(mQ|A???u?쇹?m??B0
?Ha)e?p??y*#?Ȉ?)??????sk7v?ʁ!TJ?P?!?a?{k?x%be#?#B7~?]{??a???t??8cu1?T?͓Mq??Qĩb`^Exћp$I?!>?Pԃ	?0
??8ܮ?0??GQ?W????????3c9>I`D%c???[;???J*????Y?X<+?ӥ?w?h??v6r?!?4???OH~??a?I?1???BW?"????4??????????8%????T?inc;?3u??G???4gB?J?j????#^)?w)vF?J??µ????X???'3?????r?OX??2k6?w??CL?+??}Ӟ?Q<T>"r;?i?0??܎n?1	?S????j???V??Zr??un?????GCQ?Q4????"??=l?L{ڽ?<"W%?j???滙???݌E
?v??Q[,?ɼ??׼e??G?d?uB4D?'?4X6?m?J-????ߴH,Y?????7?y([k??Ěg~?`PNa?*a?`??1?D?R?[?X¨N???l%?'S???@w?mDG?BΖ????PW???4|?@b?????????Xm뽵???????
?K?
(?$????\V????D?x?z?=?ؿ?(p?,?(?{5.(?'K??ٽ??DD(??Y?[?kFc5qz?,K?A?`??rpr}.+ɠ??D?X݉??3??,?qbM?^??+?'
%(?6?*?B?Z%?\?"???ɵ9??~(?? ??I?,?޺????2h/WK?j[.?X?jE??C?Q???C?:"E??H????G˼b?=~(_??2%?"q???Ta?Q5?RY??ݐ??U?S?7p?Ry???6? aA.??$???ǥ?xN?2????4??%
O?텰??S$]???n????սM??۫?6??+
=4?岧??f1g?2?(J???ҕk1?J????y???GJ??Ł??h?z^????W_?̬A???T????V.e>?*[?GЋ?O?|b ,?1ĝK1AM??$?B?p?e,y??^?{[5??$?<;|???8??5z?U$?E????z=?W???pb$iV?c_?P???/?S~Eȶ?_K??? ?C??v8.???׿̇??y?R???Pd>??.(?;?\)+<{???"?ω?K
-[?(q?X???|??<9????	5K??$~?W??A06????{???u?=L?????/E8'?
W?T>o?>m?H?YBR߹?|???x*??Y??l"ٔ????x????U?3'?l?????R??<Gy?h???ng[K?\???C(??R??5??О?O????"?~?z\ck?5??TT?K???J~El???ڮ??"??m?qQ?H?K̅A??ER???-K????ٛ9?:???J???P9??/??ͺ6?\?~?4???㶠xG?cf+{(p:{?_r??!<I????a2???Vw????rZ???5@y ?????????P?+      q     x?-?I??@  ?u{???????(  ?'?A?B???ӷ?????+???b?l ÒA?c???tztU?r_??????p???]????!Qx5{?:/Uxd???:?	t?y?????~?q????8uc?I??UO?W??9?D
}PJ????^6?X?qܖq?9?N'4n]?)d?????t~ɼ?W?jH???e??G)??ҍ?ʵK?vV??ZjČM???%?y?ڭ??bO?v({O?ҥ?4?+?G?~URsʪ?S????E??9>L|? n	??7I?ivO?;	ȳ[??,??v??R)N[?=<???)???W96?ߠ???vr???(H\lϳ?????kk?lI?Kc??߻D???1????KY?+????(^LO9T??t????΢??gˢ3?Q??ܟsM?&????;??Xxc???<"?O???*?/?a?
????*B????_A?(h??Bre????p??Qp??V????[?"g????8P?a|G?@????o ?????H?$?????f???Oҷ      d   ?   x???K
?0D??)z??D?Y??c?.B?h?OM?)???4z3Y?T*)??4N`?U?Bu}3???E???ap??XE?Z????f4`Nȅ???f?????????ֻ??6?d`?L]
?m?dUt2??????_?Yh?2?????pY?      p   =   x?3M5?H??Lӵ0OK?51H?ԵH2??56N44N1?06N3?I-.
%??\1z\\\ ??      a   8   x?3M5?H??Lӵ0OK?51H?ԵH2??56N44N1?06N3?4????????? (I      b   8   x???  ?Zv??A??}J?/??؈???
059R????Y??=???"?M??      c   ?   x????
1???)?V???e?zAk-m?[^s??'X?B?f`?&4?,?Ab/?.+HF???J?}gC?<8?	q	??
N?n???g??u???T?g3???n??{?IA&?H?#d?e??M*??S???O?|??q?־  GW      U   ?   x?u?9n?0?Z>E.@??D->K.R???@???'CS=??X-t?@R(?wc*^??ك?????J????????b<?`??Ԛ?r^?S???????:[??^?{|?~????Ε????=P6?yA??6????;??[CVf:7???A?z?֧o5??kT??91???'???K??]??A???8~ (T.      V   L   x?K3K44KK3?5I46?54LM?MJ5Oҵ061IMI?H36K?4?tL????J#?8?Ә33????4?$??+F??? l??      ^   P   x????0?s????@?cR??,?	?8?y?7?.6D?
??Ƶ?Q?d???H??ZW?7D&˹]$???齈???:      W   q  x???_K?0ş?O???I??&͟?`[Ntc?6I???]?\7?~z;}?'/\8?s?r~[[9?Mi =???}?YuG??D4oOw)?9?{7?8?g????t?Ȇ?𪊖??}6??i9J??u2MΎ9G@?ahX?h?>eL??B{?????T?@Ht??)4Zd?k????g?,V`y??a`$2?^mХ?(5WP?aת<???O?EQ?պ?=???K???h?	5?KhP?]&?ѹr@(zw?!??Kw?a6???C,F#ޛ??٦z3??KY.?n䓼[???? XN??I5?r?J??H(?Җ?ip?{"?????
r???+?3̉?X?E0c?2?1ϑi?/~?X7?P?͆?!x?w:?ْ?      Y      x?????? ? ?      `      x?????? ? ?      [      x?????? ? ?     