CREATE PROCEDURE [dbo].[sc_UpdateEmployee]
	@employeeID BIGINT
	, @fullName	VARCHAR(200)
	, @position	VARCHAR(50)
	, @empCode	VARCHAR(50)
	, @mobile	VARCHAR(50)
AS
BEGIN TRY
	
	IF NOT EXISTS (	SELECT	EmployeeID
					FROM	sc_Employee
					WHERE	EmployeeID = @employeeID  ) BEGIN
		RAISERROR('sp|Employee not found', 11, 1)
	END
	
	DECLARE	@oldFullName VARCHAR(100)
			, @oldId BIGINT

	IF EXISTS (	SELECT EmployeeID
				FROM	sc_Employee
				WHERE	UPPER(FullName) = UPPER(@fullName))  BEGIN
		
		SELECT	@oldFullName = FullName
				, @oldId = EmployeeID
		FROM	sc_Employee
		WHERE	UPPER(FullName) = UPPER(@fullName)
				AND UPPER(EmpCode) = UPPER(@empCode)

		IF (@employeeID <> @oldId ) BEGIN
			RAISERROR('sp|Employee Already Exists', 11, 1)
		END
	END

	UPDATE	sc_Employee
	SET		FullName = @fullName
			, Position = @position
			, EmpCode = @empCode
			, Mobile = @mobile
	WHERE	EmployeeID = @employeeID

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