CREATE PROCEDURE [dbo].[sc_ListEmployee]
	@employeeID BIGINT
AS
BEGIN TRY

	IF (@employeeID > 0) BEGIN
		IF NOT EXISTS (	SELECT	EmployeeID
						FROM	sc_Employee
						WHERE	EmployeeID = @employeeID) BEGIN
			RAISERROR('sp|no records found', 11, 1)
		END
	END

	SELECT	e.EmployeeID, e.FullName, e.Position, e.EmpCode, e.Mobile
	FROM	sc_Employee e
	WHERE	(	e.EmployeeID = @employeeID
				OR @employeeID = 0
			)
	ORDER BY e.FullName
END TRY
BEGIN CATCH
	DECLARE @errMsg NVARCHAR(MAX)
			, @errState INT
			, @errSev INT

	SELECT	@errMsg = ERROR_MESSAGE()
			, @errSev = ERROR_SEVERITY()
			, @errState = ERROR_STATE()

	RAISERROR(@errMsg, @errSev, @errState)
END CATCH