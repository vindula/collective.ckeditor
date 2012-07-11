 #-*- coding: utf-8 -*-
from Products.CMFCore.utils import getToolByName
from zope.app.component.hooks import getSite

def userLogged(event):
    """ Handler for User Login in Site """
    user = event.principal
    portal_membership = getToolByName(getSite(), 'portal_membership')
    member = portal_membership.getMemberById(user.getId())
    member.setMemberProperties(mapping={"wysiwyg_editor": 'CKeditor'})
