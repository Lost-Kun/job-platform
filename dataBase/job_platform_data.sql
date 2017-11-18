/*
SQLyog Ultimate v8.32 
MySQL - 5.7.17-log : Database - job_platform
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`job_platform` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `job_platform`;

/*Table structure for table `apply` */

DROP TABLE IF EXISTS `apply`;

CREATE TABLE `apply` (
  `Apply_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '每个申请的独特编号',
  `Project_ID` bigint(20) NOT NULL COMMENT '项目编号',
  `Employee_ID` varchar(255) NOT NULL COMMENT '设计师编号',
  `Riqi` varchar(50) DEFAULT NULL COMMENT '提交这条log的具体时间，格式为年-月-日 时:分:秒',
  PRIMARY KEY (`Apply_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `apply` */

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `Employee_ID` varchar(255) NOT NULL COMMENT '设计师的唯一编号',
  `HeadImgUrl` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `Name` varchar(255) DEFAULT NULL COMMENT '设计师昵称',
  `Name_real` varchar(255) DEFAULT NULL COMMENT '真实姓名',
  `Mobile` varchar(50) DEFAULT NULL COMMENT '手机号',
  `Zhifubao` varchar(100) DEFAULT NULL COMMENT '支付宝账号（用户薪酬发放）',
  `Position` varchar(255) DEFAULT NULL COMMENT '兼职岗位',
  `Wage` int(11) DEFAULT NULL COMMENT '兼职日薪',
  `Job_company` varchar(255) DEFAULT NULL COMMENT '工作经历——单位',
  `Job_position` varchar(255) DEFAULT NULL COMMENT '工作经历——职位',
  `Job_experience` int(11) DEFAULT NULL COMMENT '工作经历——经验（几年）',
  `Job_city` varchar(100) DEFAULT NULL COMMENT '工作经历——城市',
  `Job_district` varchar(50) DEFAULT NULL COMMENT '工作经历——区县',
  `Edu_school` varchar(255) DEFAULT NULL COMMENT '教育经历——学校',
  `Edu_department` varchar(255) DEFAULT NULL COMMENT '教育经历——系别',
  `Edu_degree` varchar(10) DEFAULT NULL COMMENT '教育经历——学历',
  `Skills` varchar(500) DEFAULT NULL COMMENT '掌握技能（文字）',
  `Skills_list` varchar(500) DEFAULT NULL COMMENT '隐性，掌握技能列表（json：技能标签）',
  `Projects` varchar(1000) DEFAULT NULL COMMENT '展示项目（文字）',
  `Projects_list` varchar(1000) DEFAULT NULL COMMENT '隐性，展示项目列表（json：项目名称+链接）',
  `Riqi` varchar(50) DEFAULT NULL COMMENT '注册日期，格式为年-月-日 时:分:秒',
  `Ordered_number` int(11) DEFAULT '0' COMMENT '被预约的次数',
  `Rating` float DEFAULT '5' COMMENT '隐性，雇主对这位设计师的综合评分',
  `State` int(1) DEFAULT '0' COMMENT '预约状态，0:未预约，1:已预约',
  PRIMARY KEY (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `employee` */

insert  into `employee`(`Employee_ID`,`HeadImgUrl`,`Name`,`Name_real`,`Mobile`,`Zhifubao`,`Position`,`Wage`,`Job_company`,`Job_position`,`Job_experience`,`Job_city`,`Job_district`,`Edu_school`,`Edu_department`,`Edu_degree`,`Skills`,`Skills_list`,`Projects`,`Projects_list`,`Riqi`,`Ordered_number`,`Rating`,`State`) values ('1',NULL,'洛',NULL,'18332551342',NULL,'前端工程师',1000,'百度','前端工程师',4,'北京','海淀区','北京大学','信息学院','本科','1、精通JS、HTML、CSS\n2、精通Vue、React',NULL,'百度地图',NULL,'2017-11-14 19:15:00',2,5,0),('2',NULL,'夏',NULL,'18410171035',NULL,'算法工程师',1100,'阿里巴巴','算法工程师',6,'上海','黄埔区','复旦大学','信息学院','硕士','1、精通Java\n2、精通算法结构\n3、精通Python',NULL,'淘宝',NULL,'2017-11-14 19:16:00',5,5,1);

/*Table structure for table `employer` */

DROP TABLE IF EXISTS `employer`;

CREATE TABLE `employer` (
  `Employer_ID` varchar(255) NOT NULL COMMENT '雇主的唯一编号',
  `HeadImgUrl` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `Name` varchar(255) DEFAULT NULL COMMENT '雇主昵称',
  `Name_real` varchar(100) DEFAULT NULL COMMENT '真实姓名',
  `Mobile` varchar(20) DEFAULT NULL COMMENT '手机号',
  `Company` varchar(255) DEFAULT NULL COMMENT '公司名称（报销用）',
  `Location` varchar(255) DEFAULT NULL COMMENT '发票寄送地址',
  `Company_introduction` varchar(1000) DEFAULT NULL COMMENT '公司产品介绍',
  `Riqi` varchar(50) DEFAULT NULL COMMENT '注册日期，格式为年-月-日 时:分:秒',
  `Rating` float DEFAULT '5' COMMENT '设计师对雇主的平均打分',
  PRIMARY KEY (`Employer_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `employer` */

insert  into `employer`(`Employer_ID`,`HeadImgUrl`,`Name`,`Name_real`,`Mobile`,`Company`,`Location`,`Company_introduction`,`Riqi`,`Rating`) values ('1',NULL,'雪','张天雪','18332551342','腾讯','深圳','微信\nQQ',NULL,5),('2',NULL,'东','徐向东','18368551342','京东','北京','京东商城',NULL,5);

/*Table structure for table `ip` */

DROP TABLE IF EXISTS `ip`;

CREATE TABLE `ip` (
  `Ip_address` varchar(50) NOT NULL COMMENT 'ip地址',
  `Ip_location` varchar(255) DEFAULT NULL COMMENT 'ip地址背后对应的真实地址',
  `Ip_ISP` varchar(255) DEFAULT NULL COMMENT 'ip地址背后对应的运营商',
  PRIMARY KEY (`Ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ip` */

/*Table structure for table `log` */

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `Log_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '每条log记录的唯一编号',
  `Project_ID` bigint(20) NOT NULL COMMENT '项目编号',
  `Progress` varchar(1000) DEFAULT NULL COMMENT '这条log的详细内容',
  `Riqi` varchar(50) DEFAULT NULL COMMENT '提交这条log的具体时间，格式为年-月-日 时:分:秒',
  PRIMARY KEY (`Log_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `log` */

/*Table structure for table `operating` */

DROP TABLE IF EXISTS `operating`;

CREATE TABLE `operating` (
  `Operation_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '操作记录的唯一ID',
  `Employer_ID` varchar(255) DEFAULT NULL COMMENT '雇主和设计师的ID二选一',
  `Employee_ID` varchar(255) DEFAULT NULL COMMENT '雇主和设计师的ID二选一',
  `Ip_address` varchar(50) DEFAULT NULL COMMENT 'ip地址',
  `Page_url` varchar(255) DEFAULT NULL COMMENT '当前页面',
  `Element` varchar(255) DEFAULT NULL COMMENT '操作对象，具体操作的html元素（具体可以讨论）',
  `Event` varchar(50) DEFAULT NULL COMMENT '操作类型，比如“点击”、“搜索”等等',
  `Desp` varchar(255) DEFAULT NULL COMMENT '这项操作的详情，比如操作是“搜索”，那么这里就记录搜索内容',
  `Riqi` varchar(50) DEFAULT NULL COMMENT '这项操作的具体日期',
  PRIMARY KEY (`Operation_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `operating` */

/*Table structure for table `project` */

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `Project_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '每个项目的唯一编号',
  `Riqi` varchar(50) DEFAULT NULL COMMENT 'project的发布日期，格式为年-月-日 时:分:秒',
  `Name` varchar(255) DEFAULT NULL COMMENT '项目名称',
  `Desp` varchar(1000) DEFAULT NULL COMMENT '项目描述',
  `Wage` int(11) DEFAULT NULL COMMENT '项目日薪（发布）',
  `Length` int(11) DEFAULT NULL COMMENT '项目工时（多少天）（发布）',
  `Wage_real` int(11) DEFAULT NULL COMMENT '项目日薪（实际支付）',
  `Length_real` int(11) DEFAULT NULL COMMENT '项目工时（实际支付）',
  `Employer_ID` varchar(255) DEFAULT NULL COMMENT '雇主编号',
  `Employee_ID` varchar(255) DEFAULT NULL COMMENT '选中的设计师的编号',
  `Skills_list` varchar(500) DEFAULT NULL COMMENT '隐性，项目需要的技能列表，json',
  `Position` varchar(255) DEFAULT NULL COMMENT '隐性，项目需要的岗位',
  `State` int(1) DEFAULT '0' COMMENT '项目状态（非常重要）',
  `Refund` int(11) DEFAULT NULL COMMENT '项目退款金额（申请）',
  `Refund_real` int(11) DEFAULT NULL COMMENT '项目退款金额（实际）',
  `Delivery_number` int(11) DEFAULT '0' COMMENT '投递次数',
  PRIMARY KEY (`Project_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `project` */

insert  into `project`(`Project_ID`,`Riqi`,`Name`,`Desp`,`Wage`,`Length`,`Wage_real`,`Length_real`,`Employer_ID`,`Employee_ID`,`Skills_list`,`Position`,`State`,`Refund`,`Refund_real`,`Delivery_number`) values (0,'2017-11-16 10:49:00','境外电商开发','国外实力集团布局新马泰的社交  ＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立研发中心   国外实力集团布局新马泰的社交＋电商项目，在北京设立',800,20,NULL,NULL,'2','1',NULL,NULL,0,NULL,NULL,0),(1,'2017-11-17 00:49:00','前端网页开发','针对宠物的一款平台项目,使用的技术包括 javascript, vue, iview 等前端技术,项目已经进行大半，目前在页面方面有很大问题，需要技术支持。  ',500,10,NULL,NULL,'1','2',NULL,NULL,0,NULL,NULL,0),(3,'2017-11-19 01:17:01','测试发布','测试发布测试发布测试发布测试发布测试发布测试发布测试发布\n测试发布测试发布测试发布测试发布测试发布测试发布测试发布',1100,54,NULL,NULL,'2',NULL,NULL,NULL,0,NULL,NULL,0);

/*Table structure for table `rating` */

DROP TABLE IF EXISTS `rating`;

CREATE TABLE `rating` (
  `Rating_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '每个评分的唯一编号',
  `Project_ID` bigint(20) NOT NULL COMMENT '项目编号',
  `Comment` varchar(1000) DEFAULT NULL COMMENT '评论（文本）',
  `Rating` float DEFAULT NULL COMMENT '评分（0-5）',
  `Type` int(1) DEFAULT NULL COMMENT '1表示这条评分是雇主对设计师的评分，2表示这条评分是设计师对雇主的评分',
  `Riqi` varchar(50) DEFAULT NULL COMMENT '该评论提交的日期',
  PRIMARY KEY (`Rating_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `rating` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
