USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Licenses_Delete_ById]    Script Date: 7/1/2023 9:08:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Author,,Axel Nieves>
-- Create date: <6/5/2023,,>
-- Description: <this is for Deleteing a licenses,,>
-- Code Reviewer:Alejandro Espinosa

-- MODIFIED BY: author
-- MODIFIED DATE: 12/1/20
-- Code Reviewer: Ale
-- Note:
-- =============================================

ALTER proc [dbo].[Licenses_Delete_ById]
							@Id int 


as
/*


declare @Id int =3
execute dbo.Licenses_Delete_ById
@Id
*/


begin


delete from dbo.Licenses 
where Id=@Id

end