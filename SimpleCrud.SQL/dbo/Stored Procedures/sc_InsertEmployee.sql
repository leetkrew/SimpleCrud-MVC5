CREATE PROCEDURE [dbo].[sc_InsertEmployee]
	@fullName	VARCHAR(200)
	,@position	VARCHAR(50)
	,@empCode	VARCHAR(50)
	,@mobile	VARCHAR(50)
AS BEGIN TRY
	BEGIN TRANSACTION

	IF EXISTS (	SELECT	EmployeeID 
				FROM	sc_Employee
				WHERE	UPPER(FullName) = UPPER(@fullName) 
						AND UPPER(EmpCode) = UPPER(@empCode)
				) BEGIN
		RAISERROR('sp|Employee Already Exists', 11, 1)
	END

	INSERT INTO sc_Employee (FullName, Position, EmpCode, Mobile)
	VALUES (@fullName, @position, @empCode, @mobile)

	COMMIT TRANSACTION

END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION
	DECLARE @errorMessage NVARCHAR(MAX)
			, @errorState INT
			, @errorSeverity INT

	SELECT	@errorMessage = ERROR_MESSAGE()
			, @errorState = ERROR_STATE()
			, @errorSeverity = ERROR_SEVERITY()

	RAISERROR(@errorMessage, @errorSeverity, @errorState)
END CATCH