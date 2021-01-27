CREATE TABLE [dbo].[sc_Employee] (
    [EmployeeID] BIGINT        IDENTITY (1, 1) NOT NULL,
    [FullName]   VARCHAR (200) NOT NULL,
    [Position]   VARCHAR (50)  NOT NULL,
    [EmpCode]    VARCHAR (50)  NOT NULL,
    [Mobile]     VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED ([EmployeeID] ASC)
);

