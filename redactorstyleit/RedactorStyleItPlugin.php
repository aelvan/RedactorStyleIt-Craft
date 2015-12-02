<?php
namespace Craft;

/**
 * Redactor Style It plugin
 *
 *
 * @author André Elvan
 */
class RedactorStyleItPlugin extends BasePlugin
{
	public function getName()
	{
		return 'Redactor Style It';
	}

	public function getVersion()
	{
		return '0.1';
	}

	public function getDeveloper()
	{
		return 'André Elvan';
	}

	public function getDeveloperUrl()
	{
		return 'http://vaersaagod.no';
	}

	public function init()
	{
		if (craft()->request->isCpRequest()) {
			$settings = $this->getSettings();

			$styleItJson = $settings['redactorStyleItJson'];

			if ($styleItJson != '') {
				craft()->templates->includeJs('var RedactorStyleIt = {}; RedactorStyleIt.styleItJson = ' . $styleItJson . ';');
			}

			$styleItJson = $settings['redactorStyleItCss'];
			if ($styleItJson != '') {
				craft()->templates->includeCss($styleItJson);
			}

			if (trim($settings->redactorStyleItCssFile)) {
				$filepath = craft()->config->parseEnvironmentString($settings->redactorStyleItCssFile);
				craft()->templates->includeCssFile($filepath);
			}

			craft()->templates->includeJsResource('redactorStyleIt/styleIt.js');
		}
	}

	protected function defineSettings()
	{
		return array(
			'redactorStyleItJson' => array(AttributeType::String, 'default' => ''),
			'redactorStyleItCss' => array(AttributeType::String, 'default' => ''),
			'redactorStyleItCssFile' => array(AttributeType::String, 'default' => ''),
		);
	}

	public function getSettingsHtml()
	{
		$config_settings = array();
		$config_settings['redactorStyleItJson'] = craft()->config->get('redactorStyleItJson');
		$config_settings['redactorStyleItCss'] = craft()->config->get('redactorStyleItCss');
		$config_settings['redactorStyleItCssFile'] = craft()->config->get('redactorStyleItCssFile');

		return craft()->templates->render('redactorStyleIt/settings', array(
			'settings' => $this->getSettings()
		));
	}

}
