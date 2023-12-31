USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Licenses_Insert]    Script Date: 7/1/2023 9:08:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Author,,Axel Nieves>
-- Create date: <6/5/2023,,>
-- Description: <this is for inserting a licenses,,>
-- Code Reviewer:Alejandro Espinosa

-- MODIFIED BY: author
-- MODIFIED DATE: 12/1/20
-- Code Reviewer: Ale
-- Note:
-- =============================================


ALTER proc [dbo].[Licenses_Insert]
					@LicenseStateId int,
					@LicenseNumber varchar(50),
					@DateAdmitted date,
					@CreatedBy int,
					
					@IsActive bit,
					@Id int output 


as
/*
declare @Id int =0
declare @LicenseStateId int = 4,
@LicenseNumber varchar(50)='MI69G',
@DateAdmitted date= '2023-04-07',
@CreatedBy int = 1,

@IsActive bit=1


execute dbo.licenses_Insert
@LicenseStateId,
@LicenseNumber,
@DateAdmitted,
@CreatedBy,

@IsActive,
@Id output

*/


begin

INSERT INTO [dbo].[Licenses]
           ([LicenseStateId]
           ,[LicenseNumber]
           ,[DateAdmitted]
           ,[CreatedBy]
           
           ,[IsActive])
     VALUES
           (@LicenseStateId
           ,@LicenseNumber
           ,@DateAdmitted
           ,@CreatedBy
           
           ,@IsActive)

		   set @Id=SCOPE_IDENTITY() 

end

