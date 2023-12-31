USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Licenses_SelectAll]    Script Date: 7/1/2023 9:09:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Axel Nieves>
-- Create date: <6/5/2023,,>
-- Description: <this is for SelectAll for a licenses,,>
-- Code Reviewer:Alejandro Espinosa

-- MODIFIED BY: author
-- MODIFIED DATE: 12/1/20
-- Code Reviewer: Ale
-- Note:
-- =============================================




ALTER proc [dbo].[Licenses_SelectAll]
					@PageIndex int
					,@PageSize int

as
/*
declare @PageIndex int =0,@PageSize int =3
execute dbo.Licenses_SelectAll
@PageIndex,
@PageSize
select *
from dbo.Licenses



*/

begin
DECLARE @offset INT = @PageIndex * @PageSize
SELECT L.[Id]
		,S.[Id] as StateId
		,S.[Name]
      ,S.Code
      ,L.[LicenseNumber]
      ,L.[DateAdmitted]
      ,L.[DateCreated]
      ,L.[IsActive]
	   ,U.[Id]
	   ,U.[FirstName]
	   ,U.[LastName]
	   ,U.[Mi]
	   ,U.[AvatarUrl]
	  , TotalCount = COUNT(1) OVER()
  FROM [dbo].[Licenses] as L inner join dbo.States as S
  on L.LicenseStateId=S.Id 
  inner join dbo.Users as U
  on L.CreatedBy=U.Id 
  

  ORDER BY L.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

end