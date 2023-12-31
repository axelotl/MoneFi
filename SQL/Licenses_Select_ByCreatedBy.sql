USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Licenses_Select_ByCreatedBy]    Script Date: 7/1/2023 9:09:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Axel Nieves>
-- Create date: <6/5/2023,,>
-- Description: <this is for Selecting byCreatedBy for a licenses,,>
-- Code Reviewer:Alejandro Espinosa

-- MODIFIED BY: author
-- MODIFIED DATE: 12/1/20
-- Code Reviewer: Ale
-- Note:
-- =============================================





ALTER proc [dbo].[Licenses_Select_ByCreatedBy]
							@CreatedBy int


as 
/*
declare @CreatedBy int =1
execute dbo.Licenses_Select_ByCreatedBy
@CreatedBy

*/


begin

SELECT L.[Id]
       ,S.Code
	  ,S.[Name]
      ,L.[LicenseNumber]
      ,L.[DateAdmitted]
      ,L.DateCreated
      ,[IsActive]
	   ,U.[Id]
	   ,U.[FirstName]
	   ,U.[LastName]
	   ,U.[Mi]
	   ,U.[AvatarUrl]--FNAme LName Mi Avatar

  FROM [dbo].[Licenses] as L inner join dbo.States as S
  on L.LicenseStateId=S.Id 
  inner join dbo.Users as U
  on L.CreatedBy=U.Id
  where L.CreatedBy=@CreatedBy




end





