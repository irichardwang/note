# 通过Authentik实现Gitlab的SSO登录

```Bash
gitlab_rails['omniauth_enabled'] = true
gitlab_rails['omniauth_allow_single_sign_on'] = ['saml']
gitlab_rails['omniauth_sync_email_from_provider'] = 'saml'
gitlab_rails['omniauth_sync_profile_from_provider'] = ['saml']
gitlab_rails['omniauth_sync_profile_attributes'] = ['email']
gitlab_rails['omniauth_auto_sign_in_with_provider'] = 'saml'
gitlab_rails['omniauth_block_auto_created_users'] = false
gitlab_rails['omniauth_auto_link_saml_user'] = true
gitlab_rails['omniauth_providers'] = [
  {
    name: 'saml',
    args: {
      assertion_consumer_service_url: 'https://gitlab.homelab.wang/users/auth/saml/callback',
      # Shown when navigating to certificates in authentik
      idp_cert_fingerprint: '97:07:ee:4a:4c:09:ca:6f:06:39:0c:ee:df:cb:f9:24:71:d5:6c:8f',
      idp_sso_target_url: 'https://sso.homelab.wang/application/saml/gitlab/sso/binding/redirect/',
      issuer: 'https://gitlab.homelab.wang',
      name_identifier_format: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
      attribute_statements: {
        email: ['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        first_name: ['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        nickname: ['http://schemas.goauthentik.io/2021/02/saml/username']
      }
    },
    label: 'authentik'
  }
]
```