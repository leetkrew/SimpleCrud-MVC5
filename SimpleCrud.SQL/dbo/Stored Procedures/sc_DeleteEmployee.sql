CREATE PROCEDURE [dbo].[sc_DeleteEmployee]
	@employeeID BIGINT
AS BEGIN TRY
	BEGIN TRANSACTION
	IF NOT EXISTS (	SELECT	EmployeeID
					FROM	[dbo].sc_Employee
					WHERE	EmployeeID = @employeeID ) BEGIN
		RAISERROR('sp|Employee Does not Exists', 11, 1)
	END

	DELETE FROM	sc_Employee
	WHERE		EmployeeID = @employeeID

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