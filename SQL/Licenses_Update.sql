USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Licenses_Update]    Script Date: 7/1/2023 9:09:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Axel Nieves>
-- Create date: <6/5/2023,,>
-- Description: <this is for Updateing a licenses,,>
-- Code Reviewer:Alejandro Espinosa

-- MODIFIED BY: author
-- MODIFIED DATE: 12/1/20
-- Code Reviewer: Ale
-- Note:
-- =============================================



ALTER proc [dbo].[Licenses_Update]
						@Id int,
						@LicenseStateId int,
						@LicenseNumber varchar(50),
						@DateAdmitted date,
						
						
						@IsActive bit
						

as
/*

select *
from dbo.Licenses


declare @Id int =1
declare @LicenseStateId int=2,
@LicenseNumber varchar(50)='NR56Y',
@DateAdmitted date= '2023-02-06',
@CreatedBy int = 1,
@IsActive bit=1

execute dbo.licenses_Update
@LicenseStateId,
@LicenseNumber,
@DateAdmitted,

@IsActive,
@Id 

select *
from dbo.Licenses
*/



begin

UPDATE [dbo].[Licenses]
   SET [LicenseStateId] = @LicenseStateId
      ,[LicenseNumber] = @LicenseNumber
      ,[DateAdmitted] = @DateAdmitted
      
      
      ,[IsActive] = @IsActive
 WHERE Id=@Id

 end

